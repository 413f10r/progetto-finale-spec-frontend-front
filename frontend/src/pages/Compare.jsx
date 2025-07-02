import DefaultLayout from "../layouts/DefaultLayout";
import { useGlobalContext } from "../contexts/GlobalContext";
import DetailCard from "../components/DetailCard";
export default function ComparePage() {
    const { compareProduct } = useGlobalContext();
    return (
        <>
            <DefaultLayout>
                <h1>Compare</h1>
                <ul className="cards-container">
                    {compareProduct.map(product => (
                        <li key={product.id}><DetailCard product={product} /></li>
                    )
                    )}
                </ul>

            </DefaultLayout>

        </>
    )
}