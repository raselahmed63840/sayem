// // src/components/ProductCategories.jsx
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import api from "../api/axios"; // axios instance with baseURL set

// const ProductCategories = () => {
//   const [categories, setCategories] = useState([]);
//   const [selectedCat, setSelectedCat] = useState(null);

//   // Fetch categories from backend
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await api.get("/categories"); // backend route
//         setCategories(res.data.categories || []);
//         if (res.data.categories?.length) setSelectedCat(res.data.categories[0]);
//       } catch (err) {
//         console.error("Failed to fetch categories:", err);
//       }
//     };
//     fetchCategories();
//   }, []);

//   return (
//     <section className="container mx-auto my-16">
//       <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
//         Our Products
//       </h2>
//       <p className="text-center text-gray-700 mb-6">
//         Browse our wide range of eco-friendly handicraft products below:
//       </p>

//       {/* Top Category Buttons */}
//       <div className="flex flex-wrap justify-center gap-4 mb-6">
//         {categories.map((cat) => (
//           <button
//             key={cat.slug}
//             className={`px-4 py-2 rounded font-semibold transition ${
//               selectedCat?.slug === cat.slug
//                 ? "bg-green-600 text-white"
//                 : "bg-yellow-400 text-black hover:bg-green-600 hover:text-white"
//             }`}
//             onClick={() => setSelectedCat(cat)}
//           >
//             {cat.name.toUpperCase()}
//           </button>
//         ))}
//       </div>

//       {/* Selected Category Details */}
//       {selectedCat && (
//         <div className="bg-white p-6 rounded shadow max-w-4xl mx-auto">
//           <h3 className="text-xl font-bold mb-2">{selectedCat.name}</h3>
//           <p className="text-gray-700 mb-4">{selectedCat.description}</p>
//           {selectedCat.image && (
//             <img
//               src={selectedCat.image}
//               alt={selectedCat.name}
//               className="w-full md:w-1/2 mx-auto rounded shadow-lg mb-4"
//             />
//           )}
//           <Link
//             to={`/products/view/${selectedCat.slug}`}
//             state={{ categorySlug: selectedCat.slug }}
//             className="inline-block px-6 py-2 border border-green-700 text-green-700 rounded hover:bg-green-700 hover:text-white transition"
//           >
//             View Products
//           </Link>
//         </div>
//       )}
//     </section>
//   );
// };

// export default ProductCategories;

import { Link } from "react-router-dom";

const ProductCategories = ({ categories }) => {
  return (
    <section className="our-products">
      <div className="container">
        <h2>Our Products</h2>

        <p>Browse eco-friendly bamboo products</p>

        <div className="category-menu">
          {categories.map((cat) => (
            <Link
              to={`/products/category/${cat.slug}`}
              className="px-4 py-2 bg-yellow-400 rounded hover:bg-green-600 hover:text-white"
            >
              {cat.name.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
