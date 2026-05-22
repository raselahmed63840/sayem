import { useEffect, useState } from "react";
import api from "../api/axios";

const AdminGallery = () => {
  const [gallery, setGallery] = useState([]);
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState("");

  // Load gallery images
  const loadGallery = async () => {
    try {
      const { data } = await api.get("/gallery/admin/all");
      setGallery(data.gallery || []);
    } catch {
      setGallery([]);
    }
  };

  useEffect(() => {
    loadGallery();
  }, []);

  const resetForm = () => {
    setImage(null);
    setEditingId(null);
    setStatus("");
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setImage(null); // reset input for new image if needed
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this gallery image?")) return;

    try {
      await api.delete(`/gallery/${id}`);
      loadGallery();
    } catch {
      alert("Gallery delete failed.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image && !editingId) {
      setStatus("Please select an image to upload.");
      return;
    }

    setStatus("Saving...");

    const formData = new FormData();
    if (image) formData.append("image", image);

    try {
      if (editingId) {
        await api.put(`/gallery/${editingId}`, formData);
        setStatus("Gallery image updated successfully.");
      } else {
        await api.post("/gallery", formData);
        setStatus("Gallery image added successfully.");
      }

      resetForm();
      loadGallery();
    } catch {
      setStatus("Gallery save failed.");
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <h1>Gallery</h1>
        <p>Upload images only (Product, Artisan, Factory, or Certificate).</p>
      </div>

      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required={!editingId}
        />

        <div className="admin-actions">
          <button className="admin-btn" type="submit">
            {editingId ? "Update Image" : "Add Image"}
          </button>
          {editingId && (
            <button
              className="admin-btn light"
              type="button"
              onClick={resetForm}
            >
              Cancel Edit
            </button>
          )}
        </div>

        {status && <p className="admin-status">{status}</p>}
      </form>

      <div className="admin-card-grid">
        {gallery.map((item) => (
          <div className="admin-card" key={item._id}>
            <img src={item.image?.url || "/logo.png"} alt="Gallery Item" />
            <p>Status: {item.isActive ? "Active" : "Inactive"}</p>
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminGallery;
