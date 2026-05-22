// src/pages/Contact.jsx
import SEO from "../components/SEO";
import InquiryForm from "../components/InquiryForm";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
const Contact = () => {
  return (
    <section className="page-section">
      <SEO
        title="Contact Nurnobi Bamboo Craft"
        description="Contact Nurnobi Bamboo Craft for bamboo product inquiry, quotation, export discussion and business communication."
      />

      <div className="container contact-grid">
        {/* Contact Information */}
        <div>
          <span className="section-kicker">Contact / Inquiry</span>
          <h1>Get in Touch With Nurnobi Bamboo Craft</h1>

          <p>
            For product inquiry, quotation, export discussion, sample request or
            company information, send us a message. We will contact you as soon
            as possible.
          </p>

          <div className="contact-info space-y-3">
            <p className="flex items-center gap-2">
              <EnvelopeIcon className="w-5 h-5 text-green-600" />
              <strong>Email:</strong> contact@nurnobibamboocraft.com
            </p>

            <p className="flex items-center gap-2">
              <PhoneIcon className="w-5 h-5 text-green-600" />
              <strong>Phone/WhatsApp:</strong> +880 1719-632705
            </p>

            <p className="flex items-center gap-2">
              <MapPinIcon className="w-5 h-5 text-green-600" />
              <strong>Location:</strong> Borni, Delduar, Tangail, Dhaka,
              Bangladesh
            </p>
          </div>

          {/* Google Map Embed */}
          <div
            className="map-container mt-6"
            style={{
              width: "100%",
              height: "400px",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            <iframe
              title="Nurnobi Bamboo Craft Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3640.0207770346888!2d89.9849551!3d24.171004099999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fdffff32bfa75f%3A0x1077a6b6122e44a4!2zTnVydW5uYWJpIEJhbWJvbyBDcmFmdCDgpqjgp4HgprDgp4Hgpqjgp43gpqjgpqzgp4Ag4Kas4Ka-4KaB4Ka24KeH4KawIOCmleCmvuCmsOCngeCmtuCmv-CmsuCnjeCmqg!5e0!3m2!1sen!2sbd!4v1779463488202!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Inquiry Form */}
        <InquiryForm />
      </div>
    </section>
  );
};

export default Contact;
