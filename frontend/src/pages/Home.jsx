import DefaultLayout from "../layouts/DefaultLayout";
import Card from "../components/Card";
import { useGlobalContext } from "../contexts/GlobalContext";
import BtnFilter from "../components/btnFilter";
import BtnOrder from "../components/BtnOrder";
import SearchBar from "../components/SerchBar";


export default function HomePage() {
  const { filteredProducts, search, setSearch } = useGlobalContext();

  return (
    <>
      <DefaultLayout>

        <figure className="banner-container">
          <img src="/img/banner/hero-smart-mood.jpg" alt="" className="banner-img" />
        </figure>
        <div className="filter-container">
          <BtnFilter />
          <SearchBar search={search} setSearch={setSearch} />
          <BtnOrder />
        </div>

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

