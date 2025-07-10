import { useGlobalContext } from "../contexts/GlobalContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import DetailCard from "../components/DetailCard";
import SearchBar from "../components/SerchBar";
import Card from "../components/Card"

export default function ComparePage() {
    const { compareProduct, removeFromCompare, filteredProducts } = useGlobalContext();
    const [detailedProducts, setDetailedProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
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
            <h3>CONFRONTA I TUOI PRODOTTI</h3>            <div className="compare-cards-container">
                {detailedProducts.map(product => (
                    <div className="compare-detail-card" key={product.id}>
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
                        <SearchBar />
                    </div>
                    <ul className="cards-container">
                        {filteredProducts.map(product => (
                            <li key={product.id}>
                                <Card product={product} />
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </DefaultLayout>
    );
}