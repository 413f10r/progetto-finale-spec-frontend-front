import { useGlobalContext } from "../contexts/GlobalContext";
import { FaFilter } from "react-icons/fa";

export default function BtnFilter() {
    const { category, setCategory } = useGlobalContext();

    return (
        <div >
           
            <p>🏷️ Filtra per categoria</p>
            <select
                className="filter-select"
                value={category}
                onChange={e => setCategory(e.target.value)}
            >
                <option value="">Tutte le Categorie</option>
                <option value="smartphone">Smartphone</option>
                <option value="tablet">Tablet</option>
                <option value="laptop">Laptop</option>
            </select>
        </div>
    );
}