import { BrowserRouter, Route, Routes, } from "react-router-dom"
import { GlobalProvider } from "./contexts/GlobalContext";
import DefaultLayout from "./layouts/DefaultLayout"
import HomePage from "./pages/Home"
import ComparePage from "./pages/Compare";
import FavoritesPage from "./pages/Favorites";
import DetailPage from "./pages/Detail";

function App() {

  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  )
}

export default App
