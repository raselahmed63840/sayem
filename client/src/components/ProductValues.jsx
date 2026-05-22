import React from "react";

// Import all your asset icons
import QualityImg from "../assets/quality-product.png";
import ComplianceImg from "../assets/compliance.png";
import OntimeImg from "../assets/ontime.png";
import CertifiImg from "../assets/certifi.png";
import EcoImg from "../assets/eco-friendly.png";
import OrganicImg from "../assets/organic.png";
import NaturalImg from "../assets/natural.png";
import BiodegradableImg from "../assets/biodegradable.png";

const ProductValues = () => {
  // Main Values (Icons row below description)
  const mainValues = [
    { img: QualityImg, title: "QUALITY PRODUCTS" },
    { img: ComplianceImg, title: "100% COMPLIANCE" },
    { img: OntimeImg, title: "ONTIME DELIVERY" },
    { img: CertifiImg, title: "CERTIFICATION" },
  ];

  // Article Boxes (4 features)
  const productFeatures = [
    {
      img: EcoImg,
      title: "Eco Friendly",
      desc: "Bamboo-based sustainable handmade products.",
    },
    {
      img: OrganicImg,
      title: "Organic",
      desc: "Crafted from natural, pesticide-free fibers for a pure product.",
    },
    {
      img: NaturalImg,
      title: "Natural",
      desc: "Utilizing the inherent beauty and strength of natural materials.",
    },
    {
      img: BiodegradableImg,
      title: "Biodegradable",
      desc: "Designed to return to the earth, leaving no trace behind.",
    },
  ];

  return (
    <section className="container mx-auto my-16">
      {/* Title & Description */}
      <div className="text-center max-w-4xl mx-auto mb-12">
        <h2 className="text-green-900 text-3xl md:text-4xl font-bold mb-4">
          All Kinds of Handmade Bamboo Products
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          Founded in 2002, Nurnobi Bamboo Craft is a Bangladesh-based
          eco-friendly handicrafts manufacturing and exporting company. We
          transform bamboo and natural materials into elegant home décor,
          fashion accessories, kitchen products, storage solutions and
          decorative art pieces.
        </p>
      </div>

      {/* Main Values Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16 text-center">
        {mainValues.map((val, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <img src={val.img} alt={val.title} className="w-16 h-16 mb-4" />
            <h3 className="font-bold text-lg">{val.title}</h3>
          </div>
        ))}
      </div>

      <h3 className="text-2xl font-bold text-center mb-8">Our Products are</h3>

      {/* Feature Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {productFeatures.map((feature, idx) => (
          <div
            key={idx}
            className="p-6 bg-white shadow-md rounded-md flex flex-col justify-center text-center hover:shadow-xl transition"
          >
            <img
              src={feature.img}
              alt={feature.title}
              className="w-16 h-16 mx-auto mb-4"
            />
            <h4 className="text-lg font-bold mb-2">{feature.title}</h4>
            <p className="text-gray-600 flex-1 flex items-center justify-center">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductValues;
