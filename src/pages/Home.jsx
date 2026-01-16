import { useEffect, useMemo, useState } from "react";
import { getProducts } from "../services/productApi.js";
import ProductCard from "../components/ProductCard.jsx";
import { useLocalStorage } from "../hooks/useLocalStorage.js";
import CartPanel from "../components/CartPanel.jsx";
import {
  addToCart,
  cartCount,
  removeFromCart,
  changeQty,
} from "../services/cart.js";
import Navbar from "../components/Navbar.jsx";
import Toast from "../components/Toast.jsx";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // UI state
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");
  const [cart, setCart] = useLocalStorage("cart", []);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState("");

  function handleAdd(product) {
    setCart((prev) => addToCart(prev, product));
    setCartOpen(true);

    setToast("Added to cart ✅");
    window.clearTimeout(window.__toastTimer);
    window.__toastTimer = window.setTimeout(() => setToast(""), 1200);
  }

  function handleRemove(id) {
    setCart((prev) => removeFromCart(prev, id));
  }

  function handleQty(id, qty) {
    setCart((prev) => changeQty(prev, id, qty));
  }

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(products.map((p) => p.category)));
    return ["all", ...unique];
  }, [products]);

  const visibleProducts = useMemo(() => {
    let list = [...products];

    // filter by category
    if (category !== "all") {
      list = list.filter((p) => p.category === category);
    }

    // search by title
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter((p) => p.title.toLowerCase().includes(q));
    }

    // sort
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "title-asc")
      list.sort((a, b) => a.title.localeCompare(b.title));

    return list;
  }, [products, search, category, sort]);

  if (loading) return <p className="container">Loading...</p>;
  if (error) return <p className="container">{error}</p>;

  return (
    <>
      <Navbar count={cartCount(cart)} onOpenCart={() => setCartOpen(true)} />

      <div className="container">
        <h1>Products</h1>
        {/* Controls */}
        <div className="controls">
          <input
            className="input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
          />

          <select
            className="select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            className="select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="default">Sort</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="title-asc">Title: A → Z</option>
          </select>
        </div>

        <p style={{ marginTop: 10, opacity: 0.7 }}>
          Showing {visibleProducts.length} / {products.length}
        </p>

        {visibleProducts.length === 0 ? (
          <p style={{ opacity: 0.7, marginTop: 16 }}>No products found.</p>
        ) : (
          <div className="grid" style={{ marginTop: 12 }}>
            {visibleProducts.map((p) => (
              <ProductCard key={p.id} product={p} onAdd={handleAdd} />
            ))}
          </div>
        )}

        <div className="grid" style={{ marginTop: 12 }}>
          {visibleProducts.map((p) => (
            <ProductCard key={p.id} product={p} onAdd={handleAdd} />
          ))}
        </div>
      </div>

      {cartOpen && (
        <CartPanel
          cart={cart}
          onClose={() => setCartOpen(false)}
          onRemove={handleRemove}
          onQty={handleQty}
        />
      )}
      <Toast message={toast} />
    </>
  );
}
