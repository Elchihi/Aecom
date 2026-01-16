import { useEffect, useState } from "react";
import { getProducts } from "../services/productApi.js";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  if (loading) {
    return <p style={{ padding: 24 }}>Loading...</p>;
  }

  if (error) {
    return <p style={{ padding: 24, color: "red" }}>{error}</p>;
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Smart Products</h1>

      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
}
