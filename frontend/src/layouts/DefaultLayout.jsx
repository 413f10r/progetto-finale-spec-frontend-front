import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function DefaultLayout({ children }) {
    return (
        <div>
            <NavBar />
            <main>
                {children}
            </main>

        </div >
    );
}