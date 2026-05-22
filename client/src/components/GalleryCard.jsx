import { useState } from "react";
import { getImageUrl, optimizeCloudinaryImage } from "../utils/imageHelper";

const GalleryCard = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <figure
        className="gallery-card"
        onClick={handleOpen}
        style={{ cursor: "pointer" }}
      >
        <img
          src={optimizeCloudinaryImage(getImageUrl(item.image), 800)}
          alt={item.title}
          loading="lazy"
        />
      </figure>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={handleClose}
        >
          <img
            src={getImageUrl(item.image)}
            alt={item.title}
            className="max-h-[90%] max-w-[90%] rounded shadow-lg"
          />
        </div>
      )}
    </>
  );
};

export default GalleryCard;
