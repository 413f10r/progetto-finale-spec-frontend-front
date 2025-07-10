import { useGlobalContext } from "../contexts/GlobalContext";

export default function BtnOrder() {
    const { sortBy, setSortBy } = useGlobalContext()

    return (
        <div>
           <p>🔁  Ordina per lettera</p>
        <select className="filter-select"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
        >
            <option value="">Ordine Casuale</option>
            <option value="a-z">A - Z</option>
            <option value="z-a">Z - A</option>
        </select> 
        </div>
        
    )
}