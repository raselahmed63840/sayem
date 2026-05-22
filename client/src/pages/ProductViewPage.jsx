import { useParams, useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

const ProductViewPage = () => {
  const { slug } = useParams();
  const location = useLocation();
  const categorySlug = location.state?.categorySlug || slug;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/products/${categorySlug}`);
        if (!data?.product) {
          setError("Product not found");
          return;
        }
        setProduct(data.product);
      } catch (err) {
        setError("Product details load failed");
      } finally {
        setLoading(false);
      }
    };
    if (categorySlug) fetchProduct();
  }, [categorySlug]);

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <div className="text-center py-12">
        <h2>{error}</h2>
        <Link
          to="/"
          className="text-green-700 border px-4 py-2 rounded hover:bg-green-700 hover:text-white transition"
        >
          Back to Home
        </Link>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">{product.title}</h1>
      {product.image && (
        <img
          src={product.image}
          alt={product.title}
          className="w-full md:w-1/2 rounded shadow-lg mb-6"
        />
      )}
      <p className="text-gray-700 mb-4">{product.description}</p>
      <p className="font-semibold mb-6">Price: {product.price || "FOB"}</p>
      <Link
        to="/"
        className="px-6 py-2 border border-green-700 text-green-700 rounded hover:bg-green-700 hover:text-white"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default ProductViewPage;
