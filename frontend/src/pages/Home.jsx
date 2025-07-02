import DefaultLayout from "../layouts/DefaultLayout";
import Card from "../components/Card";
import { useGlobalContext } from "../contexts/GlobalContext";


export default function HomePage() {
  const { product } = useGlobalContext();
 
  return (
    <>
      <DefaultLayout>
        <h1>Benvenuto nella Home!</h1>
        <figure className="banner-container">
          <img src="/img/banner/banner-iphone16.jpg" alt="" className="banner-img" />
        </figure>
        <ul className="cards-container">
          {product.map(record => (
            <li key={record.id}>
              <Card id={record.id} title={record.title} category={record.category} />
            </li>
          ))}
        </ul>

      </DefaultLayout>
    </>
  )
}

