import { useGlobalContext } from "../contexts/GlobalContext";

export default function BtnCompare({ product, onCompareClick }) {
    const { addToCompare, isInCompare, removeFromCompare } = useGlobalContext();

    if (!product) return null;

    const alreadyInCompare = isInCompare(product.id);

    const handleCompareClick = () => {
        if (alreadyInCompare) {
            removeFromCompare(product.id);
        } else {
            addToCompare(product);
        }
        if (onCompareClick) onCompareClick();
    };

    return (
        <button
            className={`btn ${alreadyInCompare ? "btn-remove" : "btn-compare"}`}
            onClick={handleCompareClick}
        >
            <strong>
                {alreadyInCompare ? "Rimuovi" : "Confronta"}
            </strong>
        </button>
    );
}