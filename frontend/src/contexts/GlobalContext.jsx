import { createContext, useContext, useState, useMemo, useEffect, useCallback } from "react";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
    const url = import.meta.env.VITE_BASE_URL;

    const [product, setProduct] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [compareProduct, setCompareProduct] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [sortBy, setSortBy] = useState("");

    // Preferiti
    const [favoritesProduct, setFavoritesProduct] = useState(() => {
        const saved = localStorage.getItem("favorites");
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
            alert(`Prodotto aggiunto ai preferiti`);
        }
    };

    // Comparatore
    const addToCompare = (productToAdd) => {
        setCompareProduct(prev => {
            if (prev.length >= 4) {
                alert("Puoi confrontare solo 4 prodotti alla volta");
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

    // Filtri e ordinamento
    const filteredProducts = useMemo(() => {
        let filtered = category
            ? product.filter(p => p.category === category)
            : product;

        if (search) {
            filtered = filtered.filter(p =>
                p.title.toLowerCase().includes(search.toLowerCase())
            );
        }

        filtered = [...filtered].sort((a, b) => {
            if (sortBy === "a-z") return a.title.localeCompare(b.title);
            if (sortBy === "z-a") return b.title.localeCompare(a.title);
            return 0;
        });

        return filtered;
    }, [product, search, category, sortBy]);

    const value = {
        product,
        setProduct,
        addToFavorites,
        favoritesProduct,
        setCompareProduct,
        compareProduct,
        addToCompare,
        isInCompare,
        removeFromCompare,
        search,
        setSearch,
        sortBy,
        setSortBy,
        category,
        setCategory,
        filteredProducts,
        selectedProduct,
        fetchProductById,
    };

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    );
}

export function useGlobalContext() {
    return useContext(GlobalContext);
}