import React, { useRef } from "react";

export default function SearchBar({ search, setSearch }) {
    const inputRef = useRef(null);

    const handleFocus = () => {
        inputRef.current && inputRef.current.select();
    };

    return (
        <div>
            <p>🔎 Cerca Dispositivi per Nome</p>
            <div className="searchbar-container">
                <input
                    ref={inputRef}
                    className="searchbar-input"
                    type="text"
                    placeholder="Cosa cerchi? "
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    onFocus={handleFocus}
                    style={{ textDecoration: search ? "underline" : "none" }}
                />
                <button
                    className="searchbar-btn"
                    onClick={() => setSearch(search)}
                >
                    CERCA
                </button>
            </div>
        </div>
    );
}