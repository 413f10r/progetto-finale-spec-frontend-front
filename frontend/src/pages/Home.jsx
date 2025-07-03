import DefaultLayout from "../layouts/DefaultLayout";
import Card from "../components/Card";
import { useGlobalContext } from "../contexts/GlobalContext";
import BtnFilter from "../components/btnFilter";
import BtnOrder from "../components/BtnOrder";


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
        <BtnOrder/>
        <ul className="cards-container">
          {filteredProducts.map(product => (
            <li key={product.id}>

              <Card key={product.id} product={product} />
            </li>
          ))}
        </ul>

      </DefaultLayout>
    </>
  )
}

