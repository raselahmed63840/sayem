const API_BASE_URL =
  import.meta.env.VITE_API_URL?.replace("/api", "") || "http://localhost:5000";

export const getImageUrl = (image) => {
  if (!image) return "/logo.png";

  if (typeof image === "string") {
    if (image.startsWith("http")) return image;
    if (image.startsWith("/uploads")) return `${API_BASE_URL}${image}`;
    if (image.startsWith("uploads")) return `${API_BASE_URL}/${image}`;
    return image;
  }

  if (image?.url) {
    if (image.url.startsWith("http")) return image.url;
    if (image.url.startsWith("/uploads")) return `${API_BASE_URL}${image.url}`;
    if (image.url.startsWith("uploads")) return `${API_BASE_URL}/${image.url}`;
    return image.url;
  }

  return "/logo.png";
};

export const optimizeCloudinaryImage = (url, width = 600, height = 400) => {
  if (!url) return "/logo.png";

  if (!url.includes("res.cloudinary.com")) {
    return getImageUrl(url);
  }

  return url.replace(
    "/upload/",
    `/upload/f_auto,q_auto,w_${width},h_${height},c_fill/`,
  );
};

export default getImageUrl;
