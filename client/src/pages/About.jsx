// src/pages/About.jsx
import SEO from "../components/SEO";
import { Link } from "react-router-dom";

import serviceDesign from "../assets/images/service-design.jpg";
import serviceTrends from "../assets/images/service-trends.jpg";
import serviceProduction from "../assets/images/service-production.jpg";

const About = () => {
  return (
    <section className="page-section">
      <SEO
        title="About Nurnobi Bamboo Craft | Handmade Bamboo Products"
        description="Nurnobi Bamboo Craft is an eco-friendly bamboo craft brand from Bangladesh, founded in 2002."
      />

      <div className="container content-page">
        <span className="section-kicker">About Us</span>
        <h1>Nurnobi Bamboo Craft</h1>

        <p>
          Nurnobi Bamboo Craft is more than a handcrafted brand. It is a story
          of tradition, resilience and human connection woven through every
          creation. Founded in 2002, we are dedicated to preserving the timeless
          beauty of natural craftsmanship by transforming bamboo and other
          eco-friendly materials into elegant products.
        </p>

        <p>
          Behind every product stands the hands of skilled women and men
          artisans whose creativity and dedication bring life to raw materials.
          Through their work, we proudly support over 250+ underprivileged
          individuals and help sustain more than 1000+ families.
        </p>

        <div className="about-highlight-grid">
          <div>
            <strong>250+</strong>
            <span>Underprivileged Individuals Supported</span>
          </div>
          <div>
            <strong>1000+</strong>
            <span>Families Sustained</span>
          </div>
          <div>
            <strong>2002</strong>
            <span>Brand Founded</span>
          </div>
        </div>

        <div className="mission-grid">
          <div className="description-card">
            <h2>Our Mission</h2>
            <p>
              Our mission is to turn every handmade piece into a meaningful
              experience—one that carries emotion, culture and care. We are
              committed to preserving traditional crafts, building sustainable
              skills, strengthening the handmade craft ecosystem and creating
              products that inspire, educate and tell stories.
            </p>
          </div>

          <div className="description-card">
            <h2>Our Vision</h2>
            <p>
              We envision a future where rural and marginalized women are not
              just participants but leaders in the handicraft industry, shaping
              their own economic and creative destinies.
            </p>
          </div>

          <div className="description-card">
            <h2>Our Commitment</h2>
            <p>
              Our commitment goes beyond craft. It is a commitment to people,
              heritage and a more meaningful way of living and creating.
            </p>
          </div>
        </div>

        <Link to="/products" className="primary-btn">
          Explore Products
        </Link>

        {/* ================= Our Service Section ================= */}
        {/* ================= Our Service Section ================= */}
        <section className="service-section mt-16">
          <h2 className="text-3xl font-bold text-center mb-4">Our Service</h2>
          <p className="text-center text-gray-600 mb-8">
            We deliver end-to-end support with meticulous attention to detail,
            from concept to final design.
          </p>

          <div className="grid md:grid-cols-3 gap-6 text-center">
            {/* Design & Development */}
            <article className="service-card p-6 bg-white rounded shadow">
              <img
                src={serviceDesign}
                alt="Design & Development"
                className="mx-auto mb-4"
              />
              <h3 className="font-bold text-lg mb-2">Design & Development</h3>
              <p className="text-gray-600 text-sm mb-4">
                We pride ourselves on high attention to detail and meeting every
                need you have for your design.
              </p>
              <ul className="text-left text-gray-600 text-sm list-disc list-inside">
                <li>Concept-to-final design guidance</li>
                <li>Tailored solutions for each brand</li>
                <li>Detail-focused design refinement</li>
              </ul>
            </article>

            {/* Latest Trends */}
            <article className="service-card p-6 bg-white rounded shadow">
              <img
                src={serviceTrends}
                alt="Latest Trends"
                className="mx-auto mb-4"
              />
              <h3 className="font-bold text-lg mb-2">Latest Trends</h3>
              <p className="text-gray-600 text-sm mb-4">
                Trends are complex and reflect economic and political shifts. We
                keep pace through focused research and planning.
              </p>
              <ul className="text-left text-gray-600 text-sm list-disc list-inside">
                <li>Market research</li>
                <li>Critical path development</li>
                <li>Visual storytelling</li>
                <li>Color and trend direction</li>
                <li>Range planning</li>
                <li>Positioning strategy</li>
                <li>Inspiring mood boards</li>
                <li>Competitor brand research</li>
                <li>Color stories and inspiration</li>
                <li>Compete with fast fashion</li>
              </ul>
            </article>

            {/* Sampling & Production */}
            <article className="service-card p-6 bg-white rounded shadow">
              <img
                src={serviceProduction}
                alt="Sampling & Production"
                className="mx-auto mb-4"
              />
              <h3 className="font-bold text-lg mb-2">Sampling & Production</h3>
              <p className="text-gray-600 text-sm mb-4">
                We closely monitor samples and bulk production to ensure the
                product reflects your brand promise.
              </p>
              <ul className="text-left text-gray-600 text-sm list-disc list-inside">
                <li>Production after prototype approval</li>
                <li>All materials, prints, embroideries, and laser cuts</li>
                <li>Monitoring from development to store arrival</li>
                <li>Customer feedback-driven improvements</li>
              </ul>
            </article>
          </div>

          {/* Technical Details */}
          <div className="technical-details mt-12">
            <h2 className="text-2xl font-bold mb-4">
              Technical Details & Production Capacity
            </h2>
            <table className="w-full text-left border">
              <tbody>
                <tr className="bg-gray-100">
                  <td className="px-4 py-2 font-semibold">Artisans:</td>
                  <td className="px-4 py-2">2,500 (Directly and Indirectly)</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Annual Turnover:</td>
                  <td className="px-4 py-2">$5 Million USD</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="px-4 py-2 font-semibold">
                    Production Lead Time:
                  </td>
                  <td className="px-4 py-2">60-120 Days</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Payment Terms:</td>
                  <td className="px-4 py-2">
                    L/C at sight or TT (30% in advance, 70% after documents
                    submission)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ======================================================== */}
      </div>
    </section>
  );
};

export default About;
