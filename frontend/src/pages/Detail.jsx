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
<DefaultLayout>
  {record ? (
    <>
      <h1>Dettagli {record.category}</h1>
      <DetailCard product={record} />
    </>
  ) : (
    <p>Caricamento...</p>
  )}
</DefaultLayout>
  )
}