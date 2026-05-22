// import { useParams, useLocation, Link } from "react-router-dom";
// import { useEffect, useState, useMemo } from "react";
// import api from "../api/axios";
// import getImageUrl from "../utils/imageHelper";
// import Loading from "../components/Loading";

// const STATIC_SIDE_IMAGE = "/details-static.jpg";

// const ProductDetails = () => {
//   const { slug } = useParams();
//   const location = useLocation();
//   const categorySlug = location.state?.categorySlug || slug;

//   const [product, setProduct] = useState(null);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const galleryImages = useMemo(() => {
//     if (!product) return [];
//     const images = [];
//     if (product.thumbnail?.url) images.push(product.thumbnail);
//     if (Array.isArray(product.images)) {
//       product.images.forEach((img) => {
//         if (img?.url && !images.some((item) => item.url === img.url))
//           images.push(img);
//       });
//     }
//     return images;
//   }, [product]);

//   useEffect(() => {
//     const loadProduct = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const { data } = await api.get(`/products/${categorySlug}`); // <-- safe slug API

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

//     if (categorySlug) loadProduct();
//   }, [categorySlug]);

//   if (loading) return <Loading />;

//   if (error || !product)
//     return (
//       <main className="product-details-page">
//         <div className="container text-center py-12">
//           <h2>{error || "Product not found."}</h2>
//           <Link to="/">Back to Home</Link>
//         </div>
//       </main>
//     );

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

//       {/* Raw Material Section */}
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
//                   "Natural bamboo product."}
//               </p>
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

//       {/* Gallery */}
//       <section className="details-gallery-section">
//         <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {galleryImages.length === 0 ? (
//             <p>No product gallery image found.</p>
//           ) : (
//             galleryImages.map((img, i) => (
//               <img
//                 key={i}
//                 src={getImageUrl(img)}
//                 alt={`${product.title} ${i + 1}`}
//                 className="w-full h-64 object-cover rounded"
//               />
//             ))
//           )}
//         </div>
//       </section>

//       {/* Related Products */}
//       {relatedProducts.length > 0 && (
//         <section className="related-products-section py-12">
//           <div className="container">
//             <h2 className="text-2xl font-bold mb-6">Related Products</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//               {relatedProducts.map((item) => (
//                 <Link
//                   key={item._id}
//                   to={`/products/${item.slug}`}
//                   state={{ categorySlug: item.slug }}
//                 >
//                   <img
//                     src={getImageUrl(item.thumbnail || item.images?.[0])}
//                     alt={item.title}
//                     className="w-full h-48 object-cover rounded"
//                   />
//                   <h3 className="mt-2 font-semibold">{item.title}</h3>
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
import { useParams, useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import Loading from "../components/Loading";

const ProductDetails = () => {
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
          setError("Product not found.");
          return;
        }
        setProduct(data.product);
      } catch (err) {
        setError("Product details load failed.");
      } finally {
        setLoading(false);
      }
    };

    if (categorySlug) fetchProduct();
  }, [categorySlug]);

  if (loading) return <Loading />;

  if (error)
    return (
      <div className="container mx-auto text-center py-12">
        <h2>{error}</h2>
        <Link
          to="/"
          className="mt-4 inline-block px-6 py-2 border border-green-700 text-green-700 rounded hover:bg-green-700 hover:text-white"
        >
          Back to Home
        </Link>
      </div>
    );

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">{product.title}</h1>
      {product.image && (
        <img
          src={product.image}
          alt={product.title}
          className="w-full md:w-1/2 h-auto object-cover rounded shadow-lg mb-6"
        />
      )}
      <p className="text-gray-700 mb-4">{product.description}</p>
      <p className="font-semibold mb-6">Price: {product.price || "FOB"}</p>
      <Link
        to="/"
        className="inline-block px-6 py-2 border border-green-700 text-green-700 rounded hover:bg-green-700 hover:text-white"
      >
        Back to Home
      </Link>
    </main>
  );
};

export default ProductDetails;
