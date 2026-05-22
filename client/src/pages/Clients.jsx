// src/pages/ClientPage.jsx
import React from "react";
import SEO from "../components/SEO";

const clientsData = [
  {
    name: "European Countries",
    items: [
      "Germany",
      "Netherlands",
      "Denmark",
      "France",
      "Italy",
      "Poland",
      "Norway",
      "United Kingdom",
    ],
  },
  {
    name: "North American Countries",
    items: ["United States of America (USA)", "Canada"],
  },
  {
    name: "Asia Countries",
    items: [
      "Turkey",
      "Japan",
      "Saudi Arabia",
      "United Arab Emirates",
      "Qatar",
      "Kuwait",
      "Oman",
    ],
  },
  { name: "South America Countries", items: ["Brazil", "Argentina"] },
];

const ClientPage = () => {
  return (
    <section className="page-section">
      <SEO
        title="Clients | Nurnobi Bamboo Craft"
        description="Our international clients across Europe, North America, Asia, and South America."
      />

      <div className="container my-16">
        <h2 className="text-3xl font-bold text-center mb-2">
          Clients list in the world
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Regional markets we currently serve
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {clientsData.map((region, index) => (
            <div
              key={index}
              className="border rounded-md p-6 shadow-sm hover:shadow-lg transition"
            >
              <h3
                className="text-lg font-semibold mb-3"
                style={{ color: getColor(index) }}
              >
                {region.name}
              </h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {region.items.map((country, idx) => (
                  <li key={idx}>{country}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Helper function to assign colors
const getColor = (index) => {
  const colors = ["#2c3e50", "#d35400", "#2980b9", "#7b1e25"];
  return colors[index % colors.length];
};

export default ClientPage;
