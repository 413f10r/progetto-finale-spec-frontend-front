import { useGlobalContext } from "../contexts/GlobalContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import DetailCard from "../components/DetailCard";
import SearchBar from "../components/SerchBar";

export default function ComparePage() {
    const { compareProduct, removeFromCompare } = useGlobalContext();
    const [detailedProducts, setDetailedProducts] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        // Fetch dettagli per ogni prodotto da confrontare
        Promise.all(
            compareProduct.map(prod =>
                fetch(`http://localhost:3001/products/${prod.id}`)
                    .then(res => res.json())
                    .then(data => data.product)
            )
        ).then(setDetailedProducts);
    }, [compareProduct]);


    return (
        <DefaultLayout>
            <h1>Confronta i tuoi prodotti</h1>
            <SearchBar />
            <div className="compare-cards-container">
                {detailedProducts.map(product => (
                    <div className="compare-detail-card" key={product.id}>
                        <DetailCard product={product} compare />
                        <div>
                            <div className="card-btn-row">
                                <button className="btn"
                                    onClick={() => removeFromCompare(product.id)}>
                                    Rimuovi
                                </button>
                                <button
                                    className="btn btnDetail"
                                    onClick={() => navigate(`/detail/${product.id}`)}
                                >
                                    Dettagli
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </DefaultLayout>
    );

}