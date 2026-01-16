export default function Navbar({ count, onOpenCart }) {
  return (
    <div className="nav">
      <div className="nav__inner">
        <div className="brand">
          <span className="brand__logo">🛍️</span>
          <span className="brand__text">Smart Products</span>
        </div>

        <button className="cartBtn" onClick={onOpenCart}>
          Cart
          <span className="badge">{count}</span>
        </button>
      </div>
    </div>
  );
}
