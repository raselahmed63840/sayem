import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import SEO from "../components/SEO";
import Loading from "../components/Loading";
import getImageUrl from "../utils/imageHelper";

const ProductGallery = () => {
  const { categoryId } = useParams();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      try {
        const categoryRes = await api.get("/categories");
        const categoryList =
          categoryRes.data.categories ||
          categoryRes.data.data ||
          categoryRes.data ||
          [];

        setCategories(categoryList);

        const currentCategory = categoryList.find(
          (cat) => cat.slug === categoryId || cat._id === categoryId,
        );

        setSelectedCategory(currentCategory || null);

        const productRes = await api.get(
          `/products?category=${categoryId}&limit=100`,
        );

        setProducts(productRes.data.products || productRes.data.data || []);
      } catch (error) {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [categoryId]);

  const title =
    selectedCategory?.name || categoryId?.replaceAll("-", " ") || "Products";

  return (
    <>
      <SEO
        title={`${title} | Nurnobi Bamboo Craft`}
        description="Browse eco-friendly handmade bamboo products."
      />

      <section
        className="relative h-[360px] bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/product-hero.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/10"></div>

        <div className="relative z-10 mx-auto flex h-full max-w-[1180px] items-center px-4">
          <h1 className="text-[44px] font-extrabold uppercase tracking-wide text-white md:text-[64px]">
            {title}
          </h1>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto max-w-[1180px] px-4">
          <div className="text-center">
            <h2 className="text-[28px] font-extrabold text-[#333] md:text-[34px]">
              Raw Material and Product Description
            </h2>
            <p className="mt-3 text-sm text-gray-600">
              Browse our {title.toLowerCase()} collection made from natural
              fibers
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-[920px] items-center gap-10 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-xl font-semibold text-[#333]">
                Product details
              </h3>

              <div className="space-y-1 text-[14px] leading-6 text-[#333]">
                <p>
                  <strong>{title}:</strong>{" "}
                  {selectedCategory?.description ||
                    "Natural handmade eco-friendly product collection for home, kitchen, décor, storage and daily use."}
                </p>
                <p>
                  <strong>Care instructions:</strong> Hand wash only.
                </p>
                <p>
                  <strong>Origin:</strong> Bangladesh.
                </p>
                <p>
                  <strong>Color:</strong> Natural / any color.
                </p>
                <p>
                  <strong>Size:</strong> As per buyer requirements.
                </p>
                <p>
                  <strong>MOQ:</strong> 1000-5000 pcs.
                </p>
                <p>
                  <strong>Capacity:</strong> 100000 pcs / 90 days.
                </p>
                <p>
                  <strong>Lead time:</strong> 60-90 days.
                </p>
                <p>
                  <strong>Price:</strong> FOB.
                </p>
              </div>
            </div>

            <div>
              <img
                src={getImageUrl(selectedCategory?.image)}
                alt={title}
                className="h-[250px] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white pb-20">
        <div className="mx-auto max-w-[920px] px-4">
          {loading ? (
            <Loading text="Loading products..." />
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
              {products.map((product) => (
                <div key={product._id} className="bg-white">
                  <img
                    src={getImageUrl(
                      product.thumbnail || product.images?.[0] || product.image,
                    )}
                    alt={product.title || product.name}
                    className="h-[170px] w-full object-contain"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <h2 className="text-2xl font-bold text-gray-800">
                No products found
              </h2>
              <p className="mt-2 text-gray-600">
                Add products from admin panel.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ProductGallery;
