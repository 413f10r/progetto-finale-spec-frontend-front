import { useGlobalContext } from "../contexts/GlobalContext";

export default function BtnOrder() {
    const { sortBy, setSortBy } = useGlobalContext()

    return (
        <select name="btn-order"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
        >
            <option value="">Ordina per lettera</option>
            <option value="a-z">A - Z</option>
            <option value="z-a">Z - A</option>
        </select>
    )
}