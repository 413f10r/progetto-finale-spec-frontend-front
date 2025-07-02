import DefaultLayout from "../layouts/DefaultLayout";
import Card from "../components/Card";
import { useGlobalContext } from "../contexts/GlobalContext";
import BtnFilter from "../components/btnFilter";


export default function HomePage() {
  const { filteredProducts } = useGlobalContext();

  return (
    <>
      <DefaultLayout>
        <h1>Benvenuto nella Home!</h1>
        <figure className="banner-container">
          <img src="/img/banner/banner-iphone16.jpg" alt="" className="banner-img" />
        </figure>
          <BtnFilter />
        <ul className="cards-container">
          {filteredProducts.map(record => (
            <li key={record.id}>
              <Card id={record.id} title={record.title} category={record.category} />
            </li>
          ))}
        </ul>

      </DefaultLayout>
    </>
  )
}

