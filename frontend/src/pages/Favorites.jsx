import DefaultLayout from "../layouts/DefaultLayout";
import { useGlobalContext } from "../contexts/GlobalContext";
import Card from "../components/Card";

export default function FavoritesPage() {
    const { favoritesProduct } = useGlobalContext();

    return (
        <>
            <DefaultLayout>
                <h1>Preferiti</h1>
                <ul className="cards-container">
                    {favoritesProduct.map(product => (
                        <li key={product.id}>
                            <Card product={product} />
                        </li>
                    ))}
                </ul>
            </DefaultLayout>
        </>
    );
}