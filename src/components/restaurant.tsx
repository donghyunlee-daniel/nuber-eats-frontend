import React from "react";
import { Link } from "react-router-dom";

interface IRestaurantProps {
  id: string;
  coverImg: string;
  name: string;
  categoryName?: string;
}

export const RestaurantComp: React.FC<IRestaurantProps> = ({
  id,
  coverImg,
  name,
  categoryName,
}) => (
  <Link to={`/restaurants/${id}`}>
    <div className="flex flex-col">
      <div
        className="py-28 bg-cover bg-center mb-3"
        style={{ backgroundImage: `url(${coverImg})` }}
      ></div>
      <h3 className="text-xl font-medium">{name}</h3>
      <span className="border-t mt-2 py-4 border-gray-400 text-xs opacity-50">
        {categoryName}
      </span>
    </div>
  </Link>
);
