import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useGlobalContext } from "../contexts/GlobalContext";

export default function Card({ product, title, category, id }) {
    const navigate = useNavigate();
    const { addToFavorites, product: allProducts, addToCompare } = useGlobalContext();

    // Usa i dati da 'product' se presente, altrimenti dalle props singole
    const data = product || { title, category, id };
    const currentProduct = product || allProducts.find(p => p.id === data.id);

    return (
        <div className="card">
            <h3>{data.title}</h3>
            <p>{data.category}</p>
            <button
                className="btnDetail"
                onClick={() => navigate(`/detail/${data.id}`)}
            >
                Dettagli
            </button>
            <button
                className="btnCompare"
                onClick={() => addToCompare(currentProduct)}
            >
                Compara
            </button>
            <FaHeart
                onClick={() => addToFavorites(currentProduct)}
                color="red"
                style={{ cursor: "pointer" }}
            />
        </div>
    );
}