// import { useEffect, useMemo, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import api from "../api/axios";
// import getImageUrl from "../utils/imageHelper";
// import Loading from "../components/Loading";

// const STATIC_SIDE_IMAGE = "/details-static.jpg";

// const ProductDetails = () => {
//   const { slug } = useParams();

//   const [product, setProduct] = useState(null);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const galleryImages = useMemo(() => {
//     if (!product) return [];

//     const images = [];

//     if (product.thumbnail?.url) {
//       images.push(product.thumbnail);
//     }

//     if (Array.isArray(product.images)) {
//       product.images.forEach((img) => {
//         if (img?.url && !images.some((item) => item.url === img.url)) {
//           images.push(img);
//         }
//       });
//     }

//     return images;
//   }, [product]);

//   useEffect(() => {
//     const loadProduct = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const { data } = await api.get(`/products/${slug}`);

//         const foundProduct = data.product;

//         if (!foundProduct) {
//           setError("Product not found.");
//           return;
//         }

//         setProduct(foundProduct);

//         if (foundProduct.category?._id) {
//           const relatedRes = await api.get(
//             `/products?category=${foundProduct.category._id}&limit=8`,
//           );

//           const filtered = (relatedRes.data.products || []).filter(
//             (item) => item._id !== foundProduct._id,
//           );

//           setRelatedProducts(filtered);
//         }
//       } catch (err) {
//         console.log(
//           "Product details error:",
//           err.response?.data || err.message,
//         );
//         setError("Product details load failed.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (slug) {
//       loadProduct();
//     }
//   }, [slug]);

//   if (loading) return <Loading />;

//   if (error || !product) {
//     return (
//       <main className="product-details-page">
//         <div className="container">
//           <div className="details-error-box">
//             <h2>{error || "Product not found."}</h2>
//             <Link to="/products">Back to Products</Link>
//           </div>
//         </div>
//       </main>
//     );
//   }

//   return (
//     <main className="product-details-page">
//       <section
//         className="product-details-hero"
//         style={{
//           backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.55), rgba(0,0,0,0.1)), url(${getImageUrl(
//             product.thumbnail || product.images?.[0],
//             STATIC_SIDE_IMAGE,
//           )})`,
//         }}
//       >
//         <div className="container">
//           <h1>{product.productType || product.category?.name || "Bamboo"}</h1>
//         </div>
//       </section>

//       <section className="raw-section">
//         <div className="container">
//           <div className="section-title">
//             <h2>Raw Material and Product Description</h2>
//             <p>
//               Browse our natural bamboo collection made from eco-friendly
//               materials.
//             </p>
//           </div>

//           <div className="details-info-grid">
//             <div className="details-text">
//               <h3>Product details</h3>

//               <p>
//                 <strong>{product.title}:</strong>{" "}
//                 {product.description ||
//                   product.shortDescription ||
//                   "This product is made from natural bamboo and crafted for home, cafe, restaurant and export use."}
//               </p>

//               <ul className="product-spec-list">
//                 <li>
//                   <strong>Scientific name:</strong>{" "}
//                   {product.scientificName || "Bambusa Vulgaris"}
//                 </li>

//                 <li>
//                   <strong>Care instructions:</strong>{" "}
//                   {product.buyerRequirement ||
//                     "Hand wash only. Keep dry after use."}
//                 </li>

//                 <li>
//                   <strong>Origin:</strong> {product.origin || "Bangladesh"}
//                 </li>

//                 <li>
//                   <strong>Color:</strong>{" "}
//                   {product.color || "Natural / Any color"}
//                 </li>

//                 <li>
//                   <strong>Size:</strong>{" "}
//                   {product.size || "As per buyer requirements"}
//                 </li>

//                 <li>
//                   <strong>MOQ:</strong> {product.moq || "500-3000 pcs"}
//                 </li>

//                 <li>
//                   <strong>Capacity:</strong>{" "}
//                   {product.capacity || "20000 pcs / 90 days hand made"}
//                 </li>

//                 <li>
//                   <strong>Lead time:</strong> {product.leadTime || "60-90 days"}
//                 </li>

//                 <li>
//                   <strong>Price:</strong> {product.priceType || "FOB"}
//                 </li>
//               </ul>
//             </div>

//             <div className="details-static-image">
//               <img
//                 src={STATIC_SIDE_IMAGE}
//                 alt="Natural bamboo material"
//                 onError={(e) => {
//                   e.currentTarget.src = getImageUrl(
//                     product.thumbnail || product.images?.[0],
//                   );
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="details-gallery-section">
//         <div className="container">
//           <div className="product-gallery-grid">
//             {galleryImages.length === 0 ? (
//               <p>No product gallery image found.</p>
//             ) : (
//               galleryImages.map((img, index) => (
//                 <div
//                   className="details-gallery-card"
//                   key={img.public_id || index}
//                 >
//                   <img
//                     src={getImageUrl(img)}
//                     alt={`${product.title} ${index + 1}`}
//                     onError={(e) => {
//                       e.currentTarget.src = "/logo.png";
//                     }}
//                   />
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       </section>

//       {relatedProducts.length > 0 && (
//         <section className="related-products-section">
//           <div className="container">
//             <div className="section-title">
//               <h2>Related Products</h2>
//               <p>More products from the same category.</p>
//             </div>

//             <div className="related-product-grid">
//               {relatedProducts.map((item) => (
//                 <Link
//                   to={`/products/${item.slug}`}
//                   className="related-product-card"
//                   key={item._id}
//                 >
//                   <img
//                     src={getImageUrl(item.thumbnail || item.images?.[0])}
//                     alt={item.title}
//                     onError={(e) => {
//                       e.currentTarget.src = "/logo.png";
//                     }}
//                   />
//                   <h3>{item.title}</h3>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </section>
//       )}
//     </main>
//   );
// };

// export default ProductDetails;

// src/pages/ProductDetails.jsx

// src/pages/ProductDetails.jsx
import { useParams, useLocation, Link } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import api from "../api/axios";
import getImageUrl from "../utils/imageHelper"; // existing helper
import Loading from "../components/Loading";

const STATIC_SIDE_IMAGE = "/details-static.jpg";

const ProductDetails = () => {
  const { slug } = useParams();
  const location = useLocation();
  const categorySlug = location.state?.categorySlug || slug;

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const galleryImages = useMemo(() => {
    if (!product) return [];
    const images = [];
    if (product.thumbnail?.url) images.push(product.thumbnail);
    if (Array.isArray(product.images)) {
      product.images.forEach((img) => {
        if (img?.url && !images.some((item) => item.url === img.url))
          images.push(img);
      });
    }
    return images;
  }, [product]);

  useEffect(() => {
    if (!categorySlug) return;

    const loadProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const { data } = await api.get(`/products/${categorySlug}`);
        if (!data.product) {
          setError("Product not found.");
          return;
        }
        setProduct(data.product);

        if (data.product.category?._id) {
          const relatedRes = await api.get(
            `/products?category=${data.product.category._id}&limit=8`,
          );
          const filtered = (relatedRes.data.products || []).filter(
            (item) => item._id !== data.product._id,
          );
          setRelatedProducts(filtered);
        }
      } catch (err) {
        setError("Product details load failed.");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [categorySlug]);

  if (loading) return <Loading />;

  if (error || !product)
    return (
      <main className="product-details-page">
        <div className="container text-center py-12">
          <h2>{error || "Product not found."}</h2>
          <Link to="/">Back to Home</Link>
        </div>
      </main>
    );

  return (
    <main className="product-details-page">
      {/* Hero Section */}
      <section
        className="product-details-hero"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.55), rgba(0,0,0,0.1)), url(${getImageUrl(product.thumbnail || product.images?.[0], STATIC_SIDE_IMAGE)})`,
        }}
      >
        <div className="container">
          <h1>{product.productType || product.category?.name || "Bamboo"}</h1>
        </div>
      </section>

      {/* Product Info Section */}
      <section className="raw-section">
        <div className="container">
          <div className="section-title">
            <h2>Raw Material and Product Description</h2>
            <p>
              Browse our natural bamboo collection made from eco-friendly
              materials.
            </p>
          </div>

          <div className="details-info-grid">
            <div className="details-text">
              <h3>Product details</h3>
              <p>
                <strong>{product.title}:</strong>{" "}
                {product.description || "Natural bamboo product."}
              </p>
            </div>

            <div className="details-static-image">
              <img src={STATIC_SIDE_IMAGE} alt="Product" />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      {galleryImages.length > 0 && (
        <section className="details-gallery-section">
          <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryImages.map((img, i) => (
              <img
                key={i}
                src={getImageUrl(img)}
                alt={`${product.title} ${i + 1}`}
                className="w-full h-64 object-cover rounded"
              />
            ))}
          </div>
        </section>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="related-products-section py-12">
          <div className="container">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedProducts.map((item) => (
                <Link
                  key={item._id}
                  to={`/products/${item.slug}`}
                  state={{ categorySlug: item.slug }}
                >
                  <img
                    src={getImageUrl(item.thumbnail || item.images?.[0])}
                    alt={item.title}
                    className="w-full h-48 object-cover rounded"
                  />
                  <h3 className="mt-2 font-semibold">{item.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default ProductDetails;
