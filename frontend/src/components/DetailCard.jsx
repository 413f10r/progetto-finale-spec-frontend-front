import { useGlobalContext } from "../contexts/GlobalContext";
import BtnHeart from "./BtnHeart";

export default function DetailCard({ product, compare }) {

    if (!product) return null;

    const {
        title,
        category,
        price,
        brand,
        description,
        memory,
        displaySize,
        image,
        mainCamera,
    } = product;

    const containerClass = compare ? "" : "detail-card-container";

  
    return (
        <div className={containerClass} style={{ position: "relative" }}>
       <BtnHeart product={product}/>
       <div>

            <figure className="img-detail-container">
                <img src={`/img/${category}/${image}`} alt={title} />
            </figure>
            <h2 style={{ textAlign: "center" }}>{title?.toUpperCase()}</h2>

       </div>
            <div className="detail-card-info">
                <div className="detail-row">
                    
                </div>
                {/* Riga categoria centrata */}
                <div className="detail-row">
                    <span className="detail-label">Categoria</span>
                    <span className="detail-value">{category}</span>
                </div>
                {/* Resto delle info */}
                <div className="detail-row">
                    <div className="detail-label">Brand</div>
                    <div className="detail-value">{brand}</div>
                </div>
                <div className="detail-row">
                    <div className="detail-label">Prezzo</div>
                    <div className="detail-value">{price} €</div>
                </div>
                <div className="detail-row">
                    <div className="detail-label">Memoria</div>
                    <div className="detail-value">{memory}</div>
                </div>
                <div className="detail-row">
                    <div className="detail-label">Display</div>
                    <div className="detail-value">{displaySize}''</div>
                </div>
                <div className="detail-row">
                    <div className="detail-label">Fotocamera</div>
                    <div className="detail-value">{mainCamera}</div>
                </div>
                <div className="detail-row">
                    <div className="detail-label">Descrizione</div>
                    <div className="detail-value">{description}</div>
                </div>
            </div>
        </div>
    );
}