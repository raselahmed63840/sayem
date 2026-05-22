import { Link } from "react-router-dom";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

const Footer = () => {
  return (
    <footer className="text-white" style={{ backgroundColor: "#1F7847" }}>
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left section */}
        <div>
          <h2 className="text-lg font-bold mb-2">Nurnobi Bamboo Craft</h2>
          <p className="text-sm">
            All Kinds of Handmade Bamboo Products — Manufacturer, Exporter,
            Wholesaler & Supplier. Founded in 2002 in Bangladesh.
          </p>
        </div>

        {/* Company links */}
        <div className="space-y-1">
          <h3 className="font-semibold mb-2">Company</h3>
          <Link to="/about" className="block hover:underline">
            About Us
          </Link>
          <Link to="/sustainability" className="block hover:underline">
            Sustainability
          </Link>
          <Link to="/gallery" className="block hover:underline">
            Gallery
          </Link>
          <Link to="/contact" className="block hover:underline">
            Contact
          </Link>
        </div>

        {/* Products links */}
        <div className="space-y-1">
          <h3 className="font-semibold mb-2">Products</h3>
          <Link to="/product-description" className="block hover:underline">
            Product Description
          </Link>
          <Link to="/products" className="block hover:underline">
            Products
          </Link>
          <Link to="/products" className="block hover:underline">
            Bamboo Furniture
          </Link>
          <Link to="/products" className="block hover:underline">
            Bamboo Home Decor
          </Link>
        </div>

        {/* Contact info */}
        <div className="space-y-2">
          <h3 className="font-semibold mb-2">Contact</h3>
          <p className="flex items-center gap-2">
            <EnvelopeIcon className="w-5 h-5 text-white" />
            contact@nurnobibamboocraft.com
          </p>
          <p className="flex items-center gap-2">
            <PhoneIcon className="w-5 h-5 text-white" />
            +880 1719-632705
          </p>
          <p className="flex items-center gap-2">
            <MapPinIcon className="w-5 h-5 text-white" />
            Borni, Delduar, Tangail, Dhaka, Bangladesh
          </p>
        </div>
      </div>

      <div className="text-center text-sm py-2 border-t border-white/20">
        © {new Date().getFullYear()} Nurnobi Bamboo Craft. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
