import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import api from "../api/axios";

const ProductsPage = () => {
  const [categories, setCategories] = useState([]);
  const location = useLocation();
  const { categoryId } = useParams(); // optional if using dynamic route

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const { data } = await api.get("/categories");
        const categoryList = Array.isArray(data)
          ? data
          : data.categories || data.data || [];
        setCategories(categoryList);
      } catch (error) {
        console.error("Failed to load categories:", error);
        setCategories([]);
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    // Scroll to hash or categoryId after categories load
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    } else if (categoryId && categories.length > 0) {
      const element = document.querySelector(`#cat-${categoryId}`);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location, categories, categoryId]);

  if (!categories || categories.length === 0) {
    return <div className="container">No categories available.</div>;
  }

  return (
    <div className="products-page container">
      {categories.map((cat) => (
        <section
          key={cat._id || cat.slug || cat.name}
          id={`cat-${cat._id}`}
          className="category-section"
        >
          <h2>{cat.name}</h2>
          <div className="products-list">
            {/* Render products for this category */}
          </div>
        </section>
      ))}
    </div>
  );
};

export default ProductsPage;
