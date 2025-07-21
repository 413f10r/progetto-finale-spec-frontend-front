import { createContext, useContext, useState, useEffect, useCallback } from "react";
import useFilter from "../hooks/useFilter";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
    const url = import.meta.env.VITE_BASE_URL;
    const [product, setProduct] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [compareProduct, setCompareProduct] = useState([]);


    // Preferiti
    const [favoritesProduct, setFavoritesProduct] = useState(() => {
        const saved = localStorage.getItem("favorites")
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favoritesProduct));
    }, [favoritesProduct]);

    // Fetch lista prodotti
    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await fetch(`${url}/products`);
                const data = await response.json();
                setProduct(data);
            } catch (err) {
                console.error("Errore fetch prodotti:", err);
            }
        };
        getProducts();
    }, [url]);

    const fetchProductById = useCallback(async (id) => {
        try {
            const response = await fetch(`${url}/products/${id}`);
            const data = await response.json();
            setSelectedProduct(data.product);
        } catch (error) {
            console.error("Errore fetch singolo prodotto:", error);
            setSelectedProduct(null);
        }
    }, [url]);

    // Preferiti
    const addToFavorites = (product) => {
        if (!favoritesProduct.some(f => f.id === product.id)) {
            setFavoritesProduct(prev => [...prev, product]);
        }
    };
    const removeFromFavorites = (product) => {
        setFavoritesProduct(prev => prev.filter(f => f.id !== product.id));
    };

    // Comparatore
    const addToCompare = (productToAdd) => {
        setCompareProduct(prev => {
            if (prev.length >= 4) {
                alert("Puoi confrontare fino a 4 prodotti per volta!");
                return prev;
            }
            if (!prev.some(p => p.id === productToAdd.id)) {
                const fullProduct = product.find(p => p.id === productToAdd.id) || productToAdd;
                return [...prev, fullProduct];
            }
            return prev;
        });
    };

    const isInCompare = (id) => compareProduct.some(p => p.id === id);

    const removeFromCompare = (id) => {
        setCompareProduct(prev => prev.filter(p => p.id !== id));
    };




    const filterData = useFilter(product)


    const value = {
        product,
        setProduct,
        addToFavorites,
        removeFromFavorites,
        favoritesProduct,
        setCompareProduct,
        compareProduct,
        addToCompare,
        isInCompare,
        removeFromCompare,
        selectedProduct,
        fetchProductById,
    };

    return (
        <GlobalContext.Provider value={{ ...filterData, ...value }}>
            {children}
        </GlobalContext.Provider>
    );
}

export function useGlobalContext() {
    return useContext(GlobalContext);
}