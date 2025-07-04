import { useState } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import { FaHeart } from "react-icons/fa";

export default function BtnHeart({ product }) {
    const { addToFavorites } = useGlobalContext();
    const [isFav, setIsFav] = useState(false);

    const handleHeartClick = () => {
        addToFavorites(product);
        setIsFav(true);
    };

    return (
        <span className="card-heart">
            <FaHeart
                onClick={handleHeartClick}
                className="icon-heart"
                style={{
                    color: isFav ? "#ff4d6d" : "#fff",
                    fontSize: "2rem",
                    cursor: "pointer",
                    transition: "color 0.2s"
                }}
            />
        </span>
    )
}