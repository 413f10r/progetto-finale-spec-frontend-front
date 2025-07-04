import { useNavigate } from "react-router-dom";
import BtnCompare from "./BtnCompare";
import BtnHeart from "./BtnHeart";

export default function Card({ product }) {
    const navigate = useNavigate();

    if (!product) return null;

    return (
        <div className="card">
       <BtnHeart/>
            <h3>{product.title.toUpperCase()}</h3>
            <p style={{ fontWeight: "bold", margin: "8px 0" }}>
                Categoria: {product.category}
            </p>
        <div className="card-btn-row">
    <button
        className="btn btnDetail"
        onClick={() => navigate(`/detail/${product.id}`)}
    >
        Dettagli
    </button>
    <BtnCompare product={product} />
</div>
        </div>
    );
}