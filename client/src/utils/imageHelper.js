const API_BASE_URL =
  import.meta.env.VITE_API_URL?.replace("/api", "") || "http://localhost:5000";

export const getImageUrl = (image) => {
  if (!image) return "/logo.png";

  // direct string path
  if (typeof image === "string") {
    if (image.startsWith("http")) {
      return image;
    }

    if (image.startsWith("/uploads")) {
      return `${API_BASE_URL}${image}`;
    }

    if (image.startsWith("uploads")) {
      return `${API_BASE_URL}/${image}`;
    }

    return image;
  }

  // object with url
  if (image.url) {
    if (image.url.startsWith("http")) {
      return image.url;
    }

    if (image.url.startsWith("/uploads")) {
      return `${API_BASE_URL}${image.url}`;
    }

    if (image.url.startsWith("uploads")) {
      return `${API_BASE_URL}/${image.url}`;
    }

    return image.url;
  }

  return "/logo.png";
};

export default getImageUrl;
