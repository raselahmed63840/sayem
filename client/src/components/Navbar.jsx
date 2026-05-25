import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import api from "../api/axios";
import logo from "../assets/logo.png";

const fallbackCategories = [
  {
    _id: "bamboo-furniture",
    name: "Bamboo Furniture",
    slug: "bamboo-furniture",
  },
  {
    _id: "bamboo-home-decor",
    name: "Bamboo Home Decor",
    slug: "bamboo-home-decor",
  },
  {
    _id: "bamboo-kitchen-products",
    name: "Bamboo Kitchen Products",
    slug: "bamboo-kitchen-products",
  },
  {
    _id: "handmade-bamboo-crafts",
    name: "Handmade Bamboo Crafts",
    slug: "handmade-bamboo-crafts",
  },
  {
    _id: "eco-lifestyle-products",
    name: "Eco Lifestyle Products",
    slug: "eco-lifestyle-products",
  },
  { _id: "gift-items", name: "Gift Items", slug: "gift-items" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const navRef = useRef(null);

  // Load categories from API
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const { data } = await api.get("/categories");
        const categoryList = Array.isArray(data)
          ? data
          : data.categories || data.data || [];
        setCategories(categoryList);
      } catch {
        setCategories(fallbackCategories);
      }
    };
    loadCategories();
  }, []);

  // Close menu if click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMenuOpen(false);
        setProductOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const finalCategories =
    categories.length > 0 ? categories : fallbackCategories;
  const closeMenu = () => {
    setMenuOpen(false);
    setProductOpen(false);
  };

  return (
    <header className="site-header">
      <nav className="main-nav" ref={navRef}>
        <div className="container nav-inner">
          {/* Logo */}
          <Link to="/" className="nav-brand" onClick={closeMenu}>
            <img src={logo} alt="Nurnobi Bamboo Craft" className="brand-logo" />
            <div className="brand-text">
              <h1>Nurnobi Bamboo Craft</h1>
              <span>Eco-Friendly Bamboo Craft Brand from Bangladesh</span>
            </div>
          </Link>

          {/* Hamburger Menu */}
          <button
            type="button"
            className={`menu-btn ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Open menu"
          >
            {menuOpen ? "×" : "⋮"}
          </button>

          {/* Nav Links */}
          <div className={`nav-links ${menuOpen ? "show" : ""}`}>
            <NavLink to="/" onClick={closeMenu}>
              Home
            </NavLink>
            <NavLink to="/about" onClick={closeMenu}>
              About Us
            </NavLink>

            {/* Products Dropdown */}
            <div className={`nav-dropdown ${productOpen ? "open" : ""}`}>
              <button
                type="button"
                onClick={() => setProductOpen((prev) => !prev)}
              >
                Products Category <span className="caret">▾</span>
              </button>

              <div className="dropdown-menu">
                {/* All Products Page */}
                <Link to="/products" onClick={closeMenu}>
                  All Products
                </Link>

                {/* Specific products → direct product pages */}
                {finalCategories.map((cat) => (
                  <Link
                    key={cat._id || cat.slug}
                    to={`/category/${cat.slug}`} // Direct product page
                    onClick={closeMenu}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            <NavLink to="/gallery" onClick={closeMenu}>
              Gallery
            </NavLink>
            <NavLink to="/sustainability" onClick={closeMenu}>
              Sustainability
            </NavLink>
            <NavLink to="/clients" onClick={closeMenu}>
              Clients
            </NavLink>
            <NavLink to="/contact" onClick={closeMenu}>
              Contact
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
