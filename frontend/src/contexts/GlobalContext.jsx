import { createContext, useContext, useState, useMemo, useEffect } from "react";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
    const url = import.meta.env.VITE_BASE_URL

    const [product, setProduct] = useState([]);
    //gestire comparazione
    const [compareProduct, setCompareProduct] = useState([])
    //gestire input ricerca
    const [search, setSearch] = useState("")
    //gestire filtro
    const [category, setCategory] = useState("")
    //gestire prefe
    const [favoritesProduct, setFavoritesProduct] = useState([])

    const [sortBy, setSortBy] = useState("title"); // o "price", ecc.
    const [sortOrder, setSortOrder] = useState(1); // 1 = asc, -1 = desc


    useEffect(() => {
        fetch("http://localhost:3001/products")
            .then(res => res.json())
            .then(product => setProduct(product))
            .catch(error => console.error(error))

    }, [])

    const addToFavorites = (product) => {
        if (!favoritesProduct.some(f => f.id === product.id)) {
            setFavoritesProduct(prev => [...prev, product])
            alert(`Prodotto  aggiunto ai preferiti`)
        }
    }


    const addToCompare = (product) => {
        if (!compareProduct.some(c => c.id === product.id)) {
            setCompareProduct(prev => [...prev, product])
            alert(`Prodotto  aggiunto al comparatore`)
        }
    }

    const filteredProducts = useMemo(() => {
        let filtered = category
            ? product.filter(p => p.category === category)
            : product;

        // Filtro ricerca per title
        if (search) {
            filtered = filtered.filter(p =>
                p.title.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Ordinamento
        filtered = [...filtered].sort((a, b) => {
            if (sortBy === "title") {
                return a.title.localeCompare(b.title) * sortOrder;
            }
            if (sortBy === "price") {
                return (a.price - b.price) * sortOrder;
            }
            return 0;
        });

        return filtered;
    }, [product, search, category, sortBy, sortOrder]);


    const value = {
        product,
        setProduct,
        addToFavorites,
        favoritesProduct,
        setCompareProduct,
        compareProduct,
        addToCompare,
        search,
        setSearch,
        sortBy,
        sortOrder,
        category,
        setCategory,
        filteredProducts,

    }

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    )
}

export function useGlobalContext() {
    return useContext(GlobalContext)

}