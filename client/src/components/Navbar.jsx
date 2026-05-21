import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import api from "../api/axios";
import logo from "../assets/logo.png";

const fallbackCategories = [
  { _id: "hanging-mirror", name: "Hanging mirror", slug: "hanging-mirror" },
  { _id: "bamboo-glass", name: "Bamboo glass", slug: "bamboo-glass" },
  { _id: "bamboo-basket", name: "Bamboo basket", slug: "bamboo-basket" },
  {
    _id: "bamboo-file-holder",
    name: "Bamboo file holder & tissue box",
    slug: "bamboo-file-holder",
  },
  {
    _id: "bamboo-lamps",
    name: "Bamboo lamps & lanterns",
    slug: "bamboo-lamps",
  },
  {
    _id: "bamboo-serving-tray",
    name: "Bamboo serving tray",
    slug: "bamboo-serving-tray",
  },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const navRef = useRef(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const { data } = await api.get("/categories");
        const categoryList = Array.isArray(data)
          ? data
          : data.categories || data.data || [];
        setCategories(categoryList);
      } catch {
        setCategories([]);
      }
    };
    loadCategories();
  }, []);

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
          <Link to="/" className="nav-brand" onClick={closeMenu}>
            <img src={logo} alt="Nurnobi Bamboo Craft" className="brand-logo" />
            <div className="brand-text">
              <h1>Nurnobi Bamboo Craft</h1>
              <span>Eco-Friendly Bamboo Craft Brand from Bangladesh</span>
            </div>
          </Link>

          <button
            type="button"
            className={`menu-btn ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Open menu"
          >
            {menuOpen ? "×" : "⋮"}
          </button>

          <div className={`nav-links ${menuOpen ? "show" : ""}`}>
            <NavLink to="/" onClick={closeMenu}>
              Home
            </NavLink>
            <NavLink to="/about" onClick={closeMenu}>
              About Us
            </NavLink>

            <div className={`nav-dropdown ${productOpen ? "open" : ""}`}>
              <button
                type="button"
                onClick={() => setProductOpen((prev) => !prev)}
              >
                Products <span className="caret">▾</span>
              </button>

              <div className="dropdown-menu">
                <Link to="/products" onClick={closeMenu}>
                  All Products
                </Link>
                {finalCategories.map((cat) => (
                  <Link
                    key={cat._id || cat.slug || cat.name}
                    to={`/products/${cat.slug || cat._id}`}
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
