import { Link } from "react-router-dom";

export default function DefaultLayout({ children }) {
    return (
        <div>
            <nav className="navBar">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/compare">Comparatore</Link></li>
                    <li><Link to="/favorites">Preferiti</Link></li>
                    <li><input type="text" placeholder="CERCA" /></li>
                </ul>
            </nav>
            <main>
                {children}
            </main>

        </div >
    );
}