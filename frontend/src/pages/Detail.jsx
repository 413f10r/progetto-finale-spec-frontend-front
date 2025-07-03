import DefaultLayout from "../layouts/DefaultLayout";
import DetailCard from "../components/DetailCard";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";

export default function DetailPage() {
  const { id } = useParams();
  const { selectedProduct, fetchProductById } = useGlobalContext();

  useEffect(() => {
    fetchProductById(id);
  }, [id, fetchProductById]);

  return (
    <DefaultLayout>
      {selectedProduct ? (
        <div className="detail-card-container">
          <DetailCard product={selectedProduct} />
        </div>
      ) : (
        <p>Caricamento...</p>
      )}
    </DefaultLayout>
  );
}