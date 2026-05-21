import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import AllProductsPage from "./pages/AllProductsPage";
import CategoryPage from "./pages/CategoryPage";
import GalleryPage from "./pages/GalleryPage";
import SustainabilityPage from "./pages/SustainabilityPage";
import ContactPage from "./pages/ContactPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<AllProductsPage />} />

        {/* Individual category pages */}
        <Route
          path="/products/hanging-mirror"
          element={<CategoryPage category="hanging-mirror" />}
        />
        <Route
          path="/products/bamboo-glass"
          element={<CategoryPage category="bamboo-glass" />}
        />
        <Route
          path="/products/bamboo-basket"
          element={<CategoryPage category="bamboo-basket" />}
        />
        <Route
          path="/products/bamboo-file-holder"
          element={<CategoryPage category="bamboo-file-holder" />}
        />
        <Route
          path="/products/bamboo-lamps"
          element={<CategoryPage category="bamboo-lamps" />}
        />
        <Route
          path="/products/bamboo-serving-tray"
          element={<CategoryPage category="bamboo-serving-tray" />}
        />

        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/sustainability" element={<SustainabilityPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  );
}

export default App;
