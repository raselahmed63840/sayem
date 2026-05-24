// src/App.jsx

import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

import ProductGallery from "./pages/ProductGallery";
import ProductDetails from "./pages/ProductDetails";
import ProductDescription from "./pages/ProductDescription";

import PhotoGallery from "./pages/PhotoGallery";
import SustainabilityCraftStory from "./pages/SustainabilityCraftStory";

import Clients from "./pages/Clients";

import ProductsPage from "./pages/ProductsPage";
import ProductListPage from "./pages/ProductListPage";
import ProductViewPage from "./pages/ProductViewPage";

import NotFound from "./pages/NotFound";

import AdminRoutes from "./routes/AdminRoutes";

function App() {
  const isAdminPath = window.location.pathname.startsWith("/admin6935");

  return (
    <>
      {!isAdminPath && <Navbar />}

      <main className="min-h-screen">
        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Static Pages */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/sustainability"
            element={<SustainabilityCraftStory />}
          />
          <Route path="/clients" element={<Clients />} />

          {/* Gallery */}
          <Route path="/gallery" element={<PhotoGallery />} />

          {/* Product Pages */}
          <Route path="/products" element={<ProductsPage />} />

          <Route
            path="/products/category/:categoryId"
            element={<ProductGallery />}
          />

          {/* <Route path="/product-gallery" element={<ProductGallery />} />
          <Route path="/products/:id" element={<ProductDetails />} /> */}

          {/* <Route
            path="/product-description/:id"
            element={<ProductDescription />}
          /> */}

          {/* <Route path="/product-list" element={<ProductListPage />} /> */}

          {/* <Route path="/product-view/:id" element={<ProductViewPage />} /> */}

          {/* Admin Panel */}
          <Route path="/admin6935/*" element={<AdminRoutes />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {!isAdminPath && <Footer />}
      {!isAdminPath && <WhatsAppButton />}
    </>
  );
}

export default App;
