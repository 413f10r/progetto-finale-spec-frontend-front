import { useGlobalContext } from "../contexts/GlobalContext";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import DetailCard from "../components/DetailCard";
import SearchBar from "../components/SerchBar";
import Card from "../components/Card"

export default function ComparePage() {
    const { compareProduct, removeFromCompare, filteredProducts, search, setSearch } = useGlobalContext();
    const [detailedProducts, setDetailedProducts] = useState([]);
    const navigate = useNavigate();
    const titleRef = useRef(null); // useRef sull'h3

    // Scrolla sull'h3 quando chiamato
    const scrollToTitle = () => {
        titleRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        // Definisco una funzione asincrona per usare await
        const fetchDetails = async () => {
            // Gestisco il caso in cui l'utente rimuove tutti i prodotti dal confronto
            if (compareProduct.length === 0) {
                setDetailedProducts([]); // Svuoto la lista dei dettagli
                return; // Interrompo l'esecuzione
            }

            try {
                // Creo un array di promesse
                const promises = compareProduct.map(prod =>
                    fetch(`http://localhost:3001/products/${prod.id}`)
                        .then(res => {
                            // controllo esplicito per errori HTTP (es. 404, 500)
                            if (!res.ok) {
                                throw new Error(`Errore HTTP! status: ${res.status}`);
                            }
                            return res.json();
                        })
                        .then(data => data.product)
                );
                // Aspetto che TUTTE le promesse siano risolte usando await
                const products = await Promise.all(promises);
                // Aggiorno lo stato solo a operazione completata con successo
                setDetailedProducts(products);
            } catch (error) {
                // Se una qualsiasi delle promesse fallisce, catturo l'errore qui
                console.error("Errore nel caricare i dettagli dei prodotti per il confronto:", error);
            }
        };

        fetchDetails(); // Eseguo la funzione asincrona
    }, [compareProduct]);

    return (
        <DefaultLayout>
            <h3 ref={titleRef}>CONFRONTA I TUOI PRODOTTI</h3>
            <div className="compare-cards-container">
                {detailedProducts.map((product) => (
                    <div className="compare-detail-card"
                        key={product.id}
                    >
                        <DetailCard product={product} compare />
                        <div className="compare-card-btn-row">
                            <button className="btn btn-remove"
                                onClick={() => removeFromCompare(product.id)}>
                                <strong>
                                    Rimuovi
                                </strong>
                            </button>
                            <button
                                className="btn btn-detail"
                                onClick={() => navigate(`/detail/${product.id}`)}
                            >
                                <strong>
                                    dettagli
                                </strong>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {compareProduct.length < 4 && (
                <>
                    <div className="compare-searchbar-container">
                        <SearchBar search={search} setSearch={setSearch} />
                    </div>
                    <ul className="cards-container">
                        {filteredProducts.map(product => (
                            <li key={product.id}>
                                <Card
                                    product={product}
                                    onCompareClick={scrollToTitle} // scrolla sull'h3 al click di "Confronta"
                                />
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </DefaultLayout>
    );
}