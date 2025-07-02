import { Link } from "react-router-dom";
import SearchBar from "./SerchBar";

export default function NavBar() {
    return (
        <>
            <nav className="navBar">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/compare">Comparatore</Link></li>
                    <li><Link to="/favorites">Preferiti</Link></li>
                    <li><SearchBar/></li>
                </ul>
                
            </nav>
        </>
    )
}