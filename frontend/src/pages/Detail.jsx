import DefaultLayout from "../layouts/DefaultLayout";
import DetailCard from "../components/DetailCard";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react"

export default function DetailPage() {
  const { id } = useParams()
  const [record, setRecord] = useState(null)


  useEffect(() => {
    fetch(`http://localhost:3001/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setRecord(data.product);
      })
      .catch(error => console.error(error));
  }, [id]);
  return (
    <>
      <DefaultLayout>
        <h1>Dettagli prodotto</h1>
        {record ? (
          <DetailCard
            id={record.id}
            title={record.title}
            category={record.category}
            price={record.price}
            brand={record.brand}
            mainCamera={record.mainCamera}
            description={record.description}
            memory={record.memory}
            displaySize={record.displaySize}
            image={record.image}
          />
        ) : (
          <p>Caricamento...</p>
        )}
      </DefaultLayout>
    </>
  )
}