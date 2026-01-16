import { cartTotal } from "../services/cart";

export default function CartPanel({ cart, onClose, onRemove, onQty }) {
  return (
    <div className="cartOverlay" onClick={onClose}>
      <div className="cart" onClick={(e) => e.stopPropagation()}>
        <div className="cart__header">
          <h2 style={{ margin: 0 }}>Your Cart</h2>
          <button className="btn btn--ghost" onClick={onClose}>
            Close
          </button>
        </div>

        {cart.length === 0 ? (
          <p style={{ opacity: 0.7 }}>Cart is empty.</p>
        ) : (
          <>
            <div className="cart__list">
              {cart.map((item) => (
                <div className="cartItem" key={item.id}>
                  <img
                    className="cartItem__img"
                    src={item.image}
                    alt={item.title}
                  />

                  <div className="cartItem__info">
                    <div className="cartItem__title">{item.title}</div>
                    <div className="cartItem__price">${item.price}</div>

                    <div className="cartItem__actions">
                      <button
                        className="btn btn--small"
                        onClick={() => onQty(item.id, item.qty - 1)}
                      >
                        -
                      </button>
                      <span className="qty">{item.qty}</span>
                      <button
                        className="btn btn--small"
                        onClick={() => onQty(item.id, item.qty + 1)}
                      >
                        +
                      </button>

                      <button
                        className="btn btn--danger"
                        onClick={() => onRemove(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart__footer">
              <strong>Total: ${cartTotal(cart).toFixed(2)}</strong>
              <button className="btn">Checkout</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
