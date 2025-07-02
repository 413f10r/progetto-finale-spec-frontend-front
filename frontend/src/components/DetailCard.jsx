export default function DetailCard({ product, ...props }) {
    const data = product || props;
    if (!data) return null;

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
    } = data;

    return (
        <div className="card">
            {image && (
                <img
                    src={image}
                    alt={title}
                    style={{ width: "120px", borderRadius: "8px", marginBottom: "1rem" }}
                />
            )}
            <h2>{title}</h2>
            <p><strong>Categoria:</strong> {category}</p>
            {<p><strong>Brand:</strong> {brand}</p>}
            {<p><strong>Prezzo:</strong> {price} €</p>}
            {<p><strong>Memoria:</strong> {memory}</p>}
            {<p><strong>Display:</strong> {displaySize}''</p>}
            {<p><strong>Fotocamera:</strong> {mainCamera}</p>}
            {<p><strong>Descrizione:</strong> {description}</p>}
        </div>
    );
}