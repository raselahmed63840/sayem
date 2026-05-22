// src/App.jsx
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

import Home from "./pages/Home";
import About from "./pages/About";
import ProductDescription from "./pages/ProductDescription";
import ProductGallery from "./pages/ProductGallery";
import ProductDetails from "./pages/ProductDetails";
import PhotoGallery from "./pages/PhotoGallery";
import SustainabilityCraftStory from "./pages/SustainabilityCraftStory";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import ProductsPage from "./pages/ProductsPage";
import AdminRoutes from "./routes/AdminRoutes";

import ProductCategories from "./components/ProductCategories";
import ProductListPage from "./pages/ProductListPage";
import CategoryPage from "./pages/CategoryPage"; // dynamic category page

function App() {
  const isAdminPath = window.location.pathname.startsWith("/admin6935");

  return (
    <>
      {!isAdminPath && <Navbar />}

      <main>
        <Routes>
          {/* Home and Static Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product-description" element={<ProductDescription />} />
          <Route path="/gallery" element={<PhotoGallery />} />
          <Route
            path="/sustainability"
            element={<SustainabilityCraftStory />}
          />

          {/* Products Routes */}
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/categories" element={<ProductCategories />} />
          <Route path="/products/category/:slug" element={<CategoryPage />} />

          {/* Product Details Integration */}
          <Route path="/products/:slug" element={<ProductDetails />} />

          {/* Admin Routes */}
          <Route path="/admin6935/*" element={<AdminRoutes />} />

          {/* Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {!isAdminPath && <Footer />}
      {!isAdminPath && <WhatsAppButton />}
    </>
  );
}

export default App;
