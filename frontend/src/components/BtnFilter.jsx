import { useGlobalContext } from "../contexts/GlobalContext";
import { FaFilter } from "react-icons/fa";

export default function BtnFilter() {
    const { category, setCategory } = useGlobalContext();

    return (
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <FaFilter style={{ color: "#999" }} />
            <select
                className="btn btn-"
                value={category}
                onChange={e => setCategory(e.target.value)}
            >
                <option value="">Tutte le Categorie 🔎</option>
                <option value="smartphone">Smartphone</option>
                <option value="tablet">Tablet</option>
                <option value="laptop">Laptop</option>
            </select>
        </div>
    );
}