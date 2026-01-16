export default function ProductCard({ product }) {
  return (
    <div className="card">
      <img className="card__img" src={product.image} alt={product.title} />
      <h3 className="card__title">{product.title}</h3>
      <div className="card__footer">
        <span className="card__price">${product.price}</span>
        <button className="btn">Add to cart</button>
      </div>
    </div>
  )
}
