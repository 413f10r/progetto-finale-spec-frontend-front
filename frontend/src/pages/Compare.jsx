import { useGlobalContext } from "../contexts/GlobalContext";
import { useEffect, useState } from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import DetailCard from "../components/DetailCard";

export default function ComparePage() {
    const { compareProduct } = useGlobalContext();
    const [detailedProducts, setDetailedProducts] = useState([]);

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
            <h1>Compare</h1>
            <ul className="compare-cards-container">
                {detailedProducts.map(product => (
                    <li key={product.id}>
                        <DetailCard product={product} />
                    </li>
                ))}
            </ul>
        </DefaultLayout>
    );
}