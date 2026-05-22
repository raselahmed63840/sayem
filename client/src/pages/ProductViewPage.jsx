import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductViewPage = () => {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProduct();
  }, [slug]);

  const loadProduct = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/products/slug/${slug}`,
      );

      setProduct(data);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }

  if (!product) {
    return (
      <div className="error-box">
        <h2>Product not found</h2>
      </div>
    );
  }

  return (
    <section className="product-view">
      <div className="container">
        <div className="product-view-grid">
          <div>
            <img src={product.image} alt={product.name} />
          </div>

          <div>
            <h1>{product.name}</h1>

            <p>{product.description}</p>

            <button>Send Inquiry</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductViewPage;
