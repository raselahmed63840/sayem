import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios"; // Axios instance with baseURL

const CategoryPage = () => {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const res = await api.get(`/products/category/${slug}`);
        if (!res.data.products || res.data.products.length === 0) {
          setError("No products found in this category.");
          return;
        }
        setProducts(res.data.products);
      } catch (err) {
        console.error(err);
        setError("Failed to load products.");
      }
    };
    fetchCategoryProducts();
  }, [slug]);

  if (error) return <p className="text-center text-red-600 py-12">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">{slug.toUpperCase()}</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p._id} className="bg-white p-4 rounded shadow">
            <img
              src={p.image}
              alt={p.title}
              className="w-full h-48 object-cover rounded mb-2"
            />
            <h2 className="font-bold">{p.title}</h2>
            <p>{p.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
