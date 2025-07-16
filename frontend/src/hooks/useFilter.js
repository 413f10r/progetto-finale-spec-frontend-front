import { useState, useMemo, useCallback } from "react";

export default function useFilter(products) {
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState(search);
    const [category, setCategory] = useState("");
    const [sortBy, setSortBy] = useState("");

    // debounce: limita la frequenza con cui una funzione viene eseguita
    function debounce(callback, delay) {
        let timer; // timer usato per ritardare l'esecuzione
        return (value) => {
            clearTimeout(timer); // cancella il timer precedente se l'utente continua a digitare/cliccare
            timer = setTimeout(() => {
                callback(value); // esegue la funzione solo dopo che è passato il delay senza nuove chiamate
            }, delay);
        }
    }

    const debouncedSetSearch = useCallback(debounce(setDebouncedSearch, 500), []);

    const filteredProducts = useMemo(() => {
        let filtered = category
            ? products.filter(p => p.category === category)
            : products;

        if (debouncedSearch) {
            filtered = filtered.filter(p =>
                p.title.toLowerCase().includes(debouncedSearch.toLowerCase())
            );
        }

        filtered = [...filtered].sort((a, b) => {
            if (sortBy === "a-z") return a.title.localeCompare(b.title);
            if (sortBy === "z-a") return b.title.localeCompare(a.title);
            return 0;
        });

        return filtered;
    }, [products, debouncedSearch, category, sortBy]);

    return {
        search, // valore corrente della ricerca (aggiornato immediatamente)
        setSearch: (value) => {
            setSearch(value); // aggiorna subito lo stato per mantenere l'input reattivo
            debouncedSetSearch(value); // attiva il debounce per aggiornare debouncedSearch dopo 500ms
        },
        category,
        setCategory,
        sortBy,
        setSortBy,
        filteredProducts
    };
}