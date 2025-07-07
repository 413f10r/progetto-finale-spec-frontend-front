import { Link } from "react-router-dom";
import { useGlobalContext } from "../contexts/GlobalContext";

export default function NavBar() {
    const { compareProduct, favoritesProduct } = useGlobalContext();

    return (
        <>
            <nav className="navBar">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li style={{ position: "relative" }}>
                        <Link to="/compare">Comparatore</Link>
                        {compareProduct.length > 0 && (
                            <span className="compare-badge">{compareProduct.length}</span>
                        )}
                    </li>
                    <li style={{ position: "relative" }}>
                        <Link to="/favorites">Preferiti</Link>
                        {favoritesProduct.length > 0 && (
                            <span className="fav-badge">{favoritesProduct.length}</span>
                        )}
                    </li>
                </ul>
            </nav>
        </>
    )
}