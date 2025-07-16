
import React from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import { useNavigate } from "react-router-dom";
import BtnCompare from "./BtnCompare";
import BtnHeart from "./BtnHeart";


const Card = React.memo(function Card({ product }) {
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
                            window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                    }} />
            </div>
        </div>

    );
})
export default Card