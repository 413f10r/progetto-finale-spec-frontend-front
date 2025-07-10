import { Link, useLocation } from "react-router-dom";
import { useGlobalContext } from "../contexts/GlobalContext";
import { useEffect } from "react";

export default function NavBar() {
    const { compareProduct, favoritesProduct } = useGlobalContext();
    const location = useLocation();

    useEffect(() => {
        // Scrolla sempre in alto quando cambia la pagina
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [location.pathname]);

    return (
        <>
            <nav className="navBar">
                <ul>
                    <li className="navBar-link">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="navBar-link">
                        <Link to="/compare">Comparatore</Link>
                        {compareProduct.length > 0 && (
                            <span className="compare-badge">{compareProduct.length}</span>
                        )}
                    </li>
                    <li className="navBar-link">
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