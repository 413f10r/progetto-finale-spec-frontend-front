import DefaultLayout from "../layouts/DefaultLayout";
import DetailCard from "../components/DetailCard";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import { useNavigate } from "react-router-dom";
import BtnCompare from "../components/BtnCompare";

export default function DetailPage() {
  const { id } = useParams();
  const { selectedProduct, fetchProductById } = useGlobalContext();
  const navigate = useNavigate()

  useEffect(() => {
    fetchProductById(id);
  }, [id, fetchProductById]);

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