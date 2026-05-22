import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

const ProductListPage = () => {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get(`/products?category=${slug}`);
        setProducts(data.products || []);
      } catch (err) {
        setProducts([]);
      }
    };
    fetchProducts();
  }, [slug]);

  if (!products.length)
    return (
      <p className="text-center my-8">No products found in this category.</p>
    );

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">
        {slug.replace("-", " ")} Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p._id} className="bg-white shadow-md p-4 rounded">
            <img src={p.image} alt={p.name} className="mb-2 rounded" />
            <h3 className="font-bold">{p.name}</h3>
            <p className="text-gray-600 text-sm">{p.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListPage;
