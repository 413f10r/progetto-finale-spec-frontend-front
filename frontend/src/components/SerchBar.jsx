import { useState, useEffect } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";

export default function SearchBar() {
    const { search, setSearch } = useGlobalContext();
    const [input, setInput] = useState(search);

    useEffect(() => {
        const handler = setTimeout(() => {
            setSearch(input);
        }, 500);
        return () => clearTimeout(handler);
    }, [input, setInput]);

    return (
        <>
            <input
            className="search-bar"
                type="text"
                placeholder="CERCA"
                value={input}
                onChange={e => setInput(e.target.value)}
            />
            <button className="btn-search" onClick={() => setSearch(input)}>
                CERCA
            </button>
        </>
    );
}