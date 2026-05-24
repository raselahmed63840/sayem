import { Link } from "react-router-dom";
import getImageUrl from "../utils/imageHelper";

const CategoryCard = ({ category }) => {
  return (
    <Link
      to={`/products/category/${category.slug || category._id}`}
      className="group block overflow-hidden rounded-xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="h-56 overflow-hidden bg-gray-100">
        <img
          src={getImageUrl(category.image)}
          alt={category.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-[#263b2d]">{category.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600">
          {category.description}
        </p>
      </div>
    </Link>
  );
};

export default CategoryCard;
