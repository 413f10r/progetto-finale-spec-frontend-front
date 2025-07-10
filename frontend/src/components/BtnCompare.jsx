import { useGlobalContext } from "../contexts/GlobalContext";

export default function BtnCompare({ product }) {
    const { addToCompare, isInCompare, removeFromCompare } = useGlobalContext();

    if (!product) return null;

    const alreadyInCompare = isInCompare(product.id);

    const handleClick = () => {
        if (alreadyInCompare) {
            removeFromCompare(product.id);
        } else {
            addToCompare(product);
        }
    };

    return (
        <button
            className={`btn ${alreadyInCompare ? "btn-remove" : "btn-compare"}`}
            onClick={handleClick}
        >
            <strong>
                {alreadyInCompare ? "Rimuovi" : "Confronta"}
            </strong>
        </button>
    );
}