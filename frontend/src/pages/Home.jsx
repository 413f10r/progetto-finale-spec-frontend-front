import DefaultLayout from "../layouts/DefaultLayout";
import { useState, useEffect } from "react";

export default function HomePage() {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/smartphones")
      .then(res => res.json())
      .then(data => setData(data))
      .catch(error => console.error(error))

  }, [])

  return (
    <>
      <DefaultLayout>
        {<h1>Benvenuto nella Home!</h1>
        }
        <ul>
          {data.map(record => (
            <li key={record.id}>
              <img
                src={record.image}
                alt={record.title}
                style={{ width: "80px", height: "80px", objectFit: "cover", marginRight: "1rem" }}
              />
              {record.title} - {record.category}
            </li>
          ))}
        </ul>
      </DefaultLayout>
    </>
  )
}

