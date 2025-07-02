import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useGlobalContext } from "../contexts/GlobalContext";

export default function Card({ title, category, id }) {
    const navigate = useNavigate();
    const { addToFavorites, product, addToCompare } = useGlobalContext();
    const currentProduct = product.find(p => p.id === id);
    return (
        <div className="card">
            <h3>{title}</h3>
            <p>{category}</p>
            <button
                className="btnDettagli"
                onClick={() => navigate(`/detail/${id}`)}
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