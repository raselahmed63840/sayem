import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getImageUrl from "../utils/getImageUrl";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const CategoryPage = () => {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/categories/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setCategory(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) return <p className="text-center py-20">Loading...</p>;
  if (!category) return <p className="text-center py-20">Category not found</p>;

  return (
    <div>
      <section
        className="category-hero"
        style={{
          backgroundImage: `url(${getImageUrl(category.bannerImage)})`,
        }}
      >
        <h1>{category.title}</h1>
      </section>

      <section className="category-details container">
        <h2>Raw Material and Product Description</h2>
        <p>Browse our {category.title} collection made from natural fibers</p>

        <div className="details-grid">
          <div>
            <h3>Product details</h3>
            <p>
              <b>{category.productDetails?.material}:</b> {category.description}
            </p>
            <p>
              <b>Care instructions:</b> {category.productDetails?.care}
            </p>
            <p>
              <b>Origin:</b> {category.productDetails?.origin}
            </p>
            <p>
              <b>Color:</b> {category.productDetails?.color}
            </p>
            <p>
              <b>Size:</b> {category.productDetails?.size}
            </p>
            <p>
              <b>MOQ:</b> {category.productDetails?.moq}
            </p>
            <p>
              <b>Capacity:</b> {category.productDetails?.capacity}
            </p>
            <p>
              <b>Lead time:</b> {category.productDetails?.leadTime}
            </p>
            <p>
              <b>Price:</b> {category.productDetails?.price}
            </p>
          </div>

          <img src={getImageUrl(category.rawImage)} alt={category.title} />
        </div>
      </section>

      <section className="product-gallery container">
        {category.galleryImages?.map((img, index) => (
          <div className="gallery-card" key={index}>
            <img src={getImageUrl(img)} alt={`${category.title}-${index}`} />
          </div>
        ))}
      </section>
    </div>
  );
};

export default CategoryPage;
