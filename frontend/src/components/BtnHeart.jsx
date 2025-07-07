import { useGlobalContext } from "../contexts/GlobalContext";
import { FaHeart } from "react-icons/fa";

export default function BtnHeart({ product }) {
    const { favoritesProduct, addToFavorites, removeFromFavorites } = useGlobalContext();

    const isFav = favoritesProduct.some(f => f.id === product.id);

    const handleHeartClick = () => {
        if (isFav) {
            removeFromFavorites(product);
        } else {
            addToFavorites(product);
        }
    };

    if (!product) return null;

  return (
    <span className="card-heart" style={{ position: "relative" }}>
        <FaHeart
            onClick={handleHeartClick}
            className="icon-heart"
            style={{
                color: isFav ? "#ff4d6d" : "#fff"
            }}
        />
        <span className="heart-info">
            {isFav ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
        </span>
    </span>
);
}