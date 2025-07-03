import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useGlobalContext } from "../contexts/GlobalContext";

export default function Card({ product }) {
    const navigate = useNavigate();
    const { addToFavorites, product: allProducts, addToCompare } = useGlobalContext();

    if (!product) return null;

    const currentProduct = allProducts.find(p => p.id === product.id);

    return (
        <div className="card">
            <h3>{product.title}</h3>
            {/* <figure>
                <img src={`/img/${product.category}/${product.image}`}  />
            </figure> */}
            <button
                className="btnDetail"
                onClick={() => navigate(`/detail/${product.id}`)}
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