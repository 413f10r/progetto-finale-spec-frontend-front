import { useState, useMemo, useEffect } from "react";

export default function useFilter(products) {
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState(search);
    const [category, setCategory] = useState("");
    const [sortBy, setSortBy] = useState("");

    // Debounce della ricerca
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500); // 500ms di debounce
        return () => clearTimeout(handler);
    }, [search]);

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
        search,
        setSearch,
        category,
        setCategory,
        sortBy,
        setSortBy,
        filteredProducts
    };
}