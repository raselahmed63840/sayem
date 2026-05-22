// // src/components/ProductCategories.jsx
// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const categories = [
//   {
//     name: "Kitchen Items",
//     slug: "kitchen",
//     description:
//       "Cutting boards, spoons, spatulas, trays, bowls, chopsticks, storage containers",
//   },
//   {
//     name: "Home Decor",
//     slug: "home-decor",
//     description:
//       "Bamboo lamps, wall art, shelves, baskets, room dividers, flower stands",
//   },
//   {
//     name: "Furniture",
//     slug: "furniture",
//     description:
//       "Coffee tables, bedside tables, bookshelves, wardrobes, outdoor chairs",
//   },
//   {
//     name: "Garden & Outdoor",
//     slug: "garden",
//     description:
//       "Bamboo fencing, garden stakes, outdoor chairs, plant trellis, patio decoration",
//   },
//   {
//     name: "Office & Workspace",
//     slug: "office",
//     description:
//       "Bamboo laptop stand, desk organizer, pen holder, monitor riser, office shelves",
//   },
//   {
//     name: "Laundry & Storage",
//     slug: "laundry",
//     description:
//       "Laundry baskets, foldable storage boxes, closet organizers, shoe racks",
//   },
// ];

// const ProductCategories = () => {
//   const [selectedSlug, setSelectedSlug] = useState(null);

//   const handleHover = (slug) => setSelectedSlug(slug);

//   return (
//     <section className="container mx-auto my-16">
//       <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
//         Our Products
//       </h2>
//       <p className="text-center text-gray-700 mb-6">
//         Browse our wide range of eco-friendly handicraft products below:
//       </p>

//       <div className="flex flex-wrap justify-center gap-4 mb-4">
//         {categories.map((cat) => (
//           <Link
//             key={cat.slug}
//             to={`/products/${cat.slug}`} // ProductDetails.jsx route
//             state={{ categorySlug: cat.slug }} // pass slug for ProductDetails
//             className={`px-4 py-2 rounded font-semibold transition ${
//               selectedSlug === cat.slug
//                 ? "bg-green-600 text-white"
//                 : "bg-yellow-400 text-black hover:bg-green-600 hover:text-white"
//             }`}
//             onMouseEnter={() => handleHover(cat.slug)}
//             onMouseLeave={() => handleHover(null)}
//           >
//             {cat.name.toUpperCase()}
//           </Link>
//         ))}
//       </div>

//       {selectedSlug && (
//         <div className="text-center text-gray-800 mb-6">
//           {categories.find((cat) => cat.slug === selectedSlug)?.description}
//         </div>
//       )}
//     </section>
//   );
// };

// export default ProductCategories;

// src/components/ProductCategories.jsx

// src/components/ProductCategories.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

const ProductCategories = ({ categories, fallbackCategories }) => {
  const [selectedSlug, setSelectedSlug] = useState(null);
  const finalCategories =
    categories.length > 0 ? categories : fallbackCategories;

  const handleHover = (slug) => setSelectedSlug(slug);

  return (
    <section className="container mx-auto my-16">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
        Our Products
      </h2>
      <p className="text-center text-gray-700 mb-6">
        Browse our wide range of eco-friendly handicraft products below:
      </p>

      <div className="flex flex-wrap justify-center gap-4 mb-4">
        {finalCategories.map((cat) => (
          <Link
            key={cat.slug}
            to={`/products/${cat.slug}`}
            state={{ categorySlug: cat.slug }}
            className={`px-4 py-2 rounded font-semibold transition ${
              selectedSlug === cat.slug
                ? "bg-green-600 text-white"
                : "bg-yellow-400 text-black hover:bg-green-600 hover:text-white"
            }`}
            onMouseEnter={() => handleHover(cat.slug)}
            onMouseLeave={() => handleHover(null)}
          >
            {cat.name.toUpperCase()} ({cat.count || 0})
          </Link>
        ))}
      </div>

      {selectedSlug && (
        <div className="text-center text-gray-800 mb-6">
          {
            finalCategories.find((cat) => cat.slug === selectedSlug)
              ?.description
          }
        </div>
      )}
    </section>
  );
};

export default ProductCategories;
