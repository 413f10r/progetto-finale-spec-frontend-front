import { createContext, useContext, useState, useMemo, useEffect } from "react";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
    const url = import.meta.env.VITE_BASE_URL

    //gestire comparazione
    const [compareProduct, setCompareProduct] = useState([])
    //gestire input ricerca
    const [search, setSearch] = useState("")
    //gestire filtro
    const [category, setCategory] = useState("")
    //gestire prefe
    const [favoritesProduct, setFavoritesProduct] = useState([])

    const [product, setProduct] = useState([]);

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

    const value = {
        product,
        setProduct,
        addToFavorites,
        favoritesProduct,
        setCompareProduct,
        compareProduct,
        addToCompare,

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