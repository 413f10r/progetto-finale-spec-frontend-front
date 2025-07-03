import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useGlobalContext } from "../contexts/GlobalContext";

export default function Card({ product }) {
    const navigate = useNavigate();
    const { addToFavorites, addToCompare, removeFromCompare, isInCompare } = useGlobalContext();

    if (!product) return null;

    return (
        <div className="card">
            <div className="card-heart">
                <FaHeart
                    onClick={() => addToFavorites(product)}
                    color="red"
                    style={{ cursor: "pointer" }}
                />
            </div>
            <h3>{product.title.toUpperCase()}</h3>
            <p style={{ fontWeight: "bold", margin: "8px 0" }}>
                Categoria: {product.category}
            </p>
            <div className="card-btn-row">
                <button
                    className="btnDetail"
                    onClick={() => navigate(`/detail/${product.id}`)}
                >
                    Dettagli
                </button>
             
<button
  className="btnCompare"
  onClick={() => isInCompare(product.id) ? removeFromCompare(product.id) : addToCompare(product)}
>
  <strong>{isInCompare(product.id) ? "RIMUOVI da" : "AGGIUNGI a"} Confronta</strong>
</button>
            </div>
        </div>
    );
}