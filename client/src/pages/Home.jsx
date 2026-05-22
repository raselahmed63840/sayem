// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../api/axios";
import SEO from "../components/SEO";
import HeroSlider from "../components/HeroSlider";
import ProductValues from "../components/ProductValues";
import ProductCategories from "../components/ProductCategories";

const fallbackCategories = [
  {
    _id: "bamboo-furniture",
    name: "Bamboo Furniture",
    slug: "bamboo-furniture",
    count: 12,
  },
  {
    _id: "bamboo-home-decor",
    name: "Bamboo Home Decor",
    slug: "bamboo-home-decor",
    count: 8,
  },
  {
    _id: "bamboo-kitchen-products",
    name: "Bamboo Kitchen Products",
    slug: "bamboo-kitchen-products",
    count: 10,
  },
  {
    _id: "handmade-bamboo-crafts",
    name: "Handmade Bamboo Crafts",
    slug: "handmade-bamboo-crafts",
    count: 7,
  },
  {
    _id: "eco-lifestyle-products",
    name: "Eco Lifestyle Products",
    slug: "eco-lifestyle-products",
    count: 6,
  },
  { _id: "gift-items", name: "Gift Items", slug: "gift-items", count: 5 },
];

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [sliders, setSliders] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const loadHomeData = async () => {
      setLoading(true);
      try {
        const [sliderRes, categoryRes] = await Promise.all([
          api.get("/sliders"),
          api.get("/categories"),
        ]);

        if (!isMounted) return;

        setSliders(sliderRes.data.sliders || []);
        setCategories(categoryRes.data.categories || fallbackCategories);
      } catch {
        setCategories(fallbackCategories);
      } finally {
        setLoading(false);
      }
    };

    loadHomeData();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) return <p className="text-center py-12">Preparing website...</p>;

  return (
    <>
      <SEO />
      <HeroSlider slides={sliders} />
      <br /> <br /> <br />
      <ProductValues />
      <br /> <br />
      {/* Commitment Section */}
      <section className="commitment-section py-16 bg-green-50">
        <div className="container mx-auto px-4 md:flex md:items-center md:gap-8">
          {/* Text Content */}
          <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
            <span className="text-yellow-500 uppercase font-semibold text-sm block mb-2">
              Our Commitment
            </span>
            <h2 className="text-3xl font-bold mb-6">
              Empowering People, Preserving Heritage
            </h2>

            <ul className="mb-6 list-disc list-inside text-gray-700">
              <li>Empowering women artisans.</li>
              <li>Creating a sustainable future.</li>
              <li>Nurturing nature and livelihoods.</li>
              <li>Building communities through ethical production.</li>
              <li>Preserving our planet one handmade piece at a time.</li>
            </ul>

            <Link
              to="/sustainability"
              className="inline-block px-6 py-3 border border-green-700 text-green-700 font-semibold rounded hover:bg-green-700 hover:text-white transition"
            >
              Read Craft Story
            </Link>
          </div>

          {/* Image */}
          <div className="md:w-1/2 flex justify-center">
            <img
              src="/src/assets/commitment-image.png" // replace with uploaded image path
              alt="Commitment"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>
      <ProductCategories
        categories={categories}
        fallbackCategories={fallbackCategories}
      />
    </>
  );
};

export default Home;
