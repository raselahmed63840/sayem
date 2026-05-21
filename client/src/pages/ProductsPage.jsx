import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../api/axios";

const ProductsPage = () => {
  const [categories, setCategories] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const { data } = await api.get("/categories");
        const categoryList = Array.isArray(data)
          ? data
          : data.categories || data.data || [];
        setCategories(categoryList);
      } catch {
        setCategories([]);
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [location, categories]);

  return (
    <div className="products-page container">
      {categories.map((cat) => (
        <section
          key={cat._id}
          id={`cat-${cat._id}`}
          className="category-section"
        >
          <h2>{cat.name}</h2>
          <div className="products-list">
            {/* এখানে সেই ক্যাটেগরির প্রোডাক্ট রেন্ডার করুন */}
          </div>
        </section>
      ))}
    </div>
  );
};

export default ProductsPage;
