import React from "react";

interface IRestaurantProps {
    id:string;
    coverImg:string;
    name:string;
    categoryName?:string;
}

export const Restaurant: React.FC<IRestaurantProps> = ({coverImg,name,categoryName}) => (
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
);
