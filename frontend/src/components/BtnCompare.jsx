import { useGlobalContext } from "../contexts/GlobalContext";

export default function BtnCompare({ product }) {
    const { addToCompare, isInCompare } = useGlobalContext();

    if (!product) return null;

    const alreadyInCompare = isInCompare(product.id);

    return (
        <button
            className="btn btnCompare"
            disabled={alreadyInCompare}
            style={{
                background: alreadyInCompare ? "#444" : "",
                cursor: alreadyInCompare ? "not-allowed" : "pointer"
            }}
            onClick={() => !alreadyInCompare && addToCompare(product)}
        >
            <strong>
                {alreadyInCompare ? "Confronta" : "Confronta"}
            </strong>
        </button>
    );
}