import React from "react";
import { DishOption } from "../gql/graphql";

interface IDishProps {
  descriptions: string;
  name: string;
  price: number;
  isCustomer?: boolean;
  options?: DishOption[] | null;
}

export const Dish: React.FC<IDishProps> = ({
  descriptions,
  name,
  price,
  isCustomer = false,
  options,
}) => {
  console.log(options);
  return (
    <div className="px-8 py-4 border hover:border-gray-800 tansition-all">
      <div className="mb-5">
        <h3 className="text-lg font-medium">{name}</h3>
        <h4 className="font-medium">{descriptions}</h4>
      </div>
      <span>${price}</span>
      {isCustomer && options && options?.length !== 0 && (
        <div>
            <h5 className="my-5 font-medium">Dish Options</h5>
          {options?.map((option,index) => (
            <span className="flex items-center">
            <h6 className="mr-2" key={index}>{option.name}</h6>
            <h6 className="text-sm opacity-75" key={index}>(${option?.extra})</h6>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
