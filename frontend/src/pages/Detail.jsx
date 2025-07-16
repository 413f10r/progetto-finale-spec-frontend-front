import DefaultLayout from "../layouts/DefaultLayout";
import DetailCard from "../components/DetailCard";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import { useNavigate } from "react-router-dom";
import BtnCompare from "../components/BtnCompare";

export default function DetailPage() {
const { id } = useParams(); // estrae l'id del prodotto dalla URL
const { selectedProduct, fetchProductById } = useGlobalContext(); // ottiene il prodotto selezionato e la funzione per caricarlo dal context
const navigate = useNavigate(); // hook per la navigazione programmatica

useEffect(() => {
    fetchProductById(id); // carica i dettagli del prodotto quando l'id cambia
}, [id, fetchProductById]); // dipendenze: ricarica se cambia l'id o la funzione fetch

  return (
    <DefaultLayout>
      {selectedProduct ? (
        <DetailCard product={selectedProduct} />
      ) : (
        <p>Caricamento...</p>
      )}
      <div className="container-btn">
        <button
          className=" btn btn-back-home"
          onClick={() => navigate("/")}
        >
          Home
        </button>
        <BtnCompare product={selectedProduct} />
      </div>

    </DefaultLayout>
  );
}