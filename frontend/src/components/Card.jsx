import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../contexts/GlobalContext";
import BtnCompare from "./BtnCompare";
import BtnHeart from "./BtnHeart";

export default function Card({ product }) {
    const navigate = useNavigate();

    if (!product) return null;

    return (


        <div className="card">
            <div className="card-heart-home">
                <BtnHeart product={product} />
            </div>
            <p><strong>{product.title.toUpperCase()}</strong></p>
            <p><strong>
                Categoria: {product.category.toUpperCase()}
            </strong>
            </p>
            <div className="card-btn-row">
                <button
                    className="btn btn-detail"
                    onClick={() => navigate(`/detail/${product.id}`)}
                >
                    <strong>

                        Dettagli
                    </strong>
                </button>
                <BtnCompare product={product}
                    onCompareClick={() => {
                        if (location.pathname === "/compare") {
                            window.scrollTo({ top: 2, behavior: "smooth" })
                        }
                    }} />
            </div>
        </div>

    );
}