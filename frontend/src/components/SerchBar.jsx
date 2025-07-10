import { useState, useEffect } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";

export default function SearchBar() {
    const { search, setSearch } = useGlobalContext();
    const [input, setInput] = useState("");

    useEffect(() => {
        const handler = setTimeout(() => {
            setSearch(input);
        }, 500);
        return () => clearTimeout(handler);
    }, [input, setInput]);


    return (
        <div >
            <p>🔎 Cerca Dispositivi per Nome</p>
            <div className="searchbar-container">
                <input
                    className="searchbar-input"
                    type="text"
                    placeholder="Cosa cerchi? "
                    value={input}
                    onChange={e => setInput(e.target.value)}
                />
                <button
                    className="searchbar-btn"
                    onClick={() => {
                        setSearch(input);
                    }}
                >
                    CERCA
                </button>
            </div>
        </div>
    );
}