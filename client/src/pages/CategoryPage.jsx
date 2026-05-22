// src/pages/CategoryPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios"; // backend axios instance

const CategoryPage = () => {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      try {
        const res = await api.get(`/products/category/${slug}`);
        setProducts(res.data);
      } catch (err) {
        console.error(err);
        setProducts([]); // fallback empty array
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [slug]);

  if (loading) return <p className="text-center py-12">Loading...</p>;

  if (products.length === 0)
    return (
      <p className="text-center py-12 border border-red-400 text-red-600 rounded mx-4">
        No products found in this category.
      </p>
    );

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8 capitalize">
        {slug.replace("-", " ")}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
              <p className="text-gray-600 text-sm mb-4">
                {product.description.substring(0, 150)}...
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
