export default function DetailCard({ product }) {
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

    return (
        <div className="card">
            <figure className="img-detail-container">

                <img src={`/img/${category}/${image}`} alt={title} />             </figure>
            <p><strong>Categoria:</strong> {category}</p>
            <p><strong>Brand:</strong> {brand}</p>
            <p><strong>Prezzo:</strong> {price} €</p>
            <p><strong>Memoria:</strong> {memory}</p>
            <p><strong>Display:</strong> {displaySize}''</p>
            <p><strong>Fotocamera:</strong> {mainCamera}</p>
            <p><strong>Descrizione:</strong> {description}</p>
        </div>
    );
}