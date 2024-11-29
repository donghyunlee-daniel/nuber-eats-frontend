import React from "react";
import { DishOption } from "../gql/graphql";

interface IDishProps {
  id?: number;
  descriptions: string;
  name: string;
  price: number;
  isCustomer?: boolean;
  options?: DishOption[] | null;
  orderStarted?: boolean;
  addItemToOrder?: (dishId: number) => void;
  removeFromOrder?: (dishId: number) => void;
  isSelected?: boolean;
  children?: React.ReactNode;
}

export const Dish: React.FC<IDishProps> = ({
  id = 0,
  descriptions,
  name,
  price,
  isCustomer = false,
  options,
  orderStarted = false,
  addItemToOrder,
  isSelected,
  removeFromOrder,
  children:dishOption
}) => {
  const onClick = () => {
    if (orderStarted) {
      if (!isSelected && addItemToOrder) {
        return addItemToOrder(id);
      }
      if (isSelected && removeFromOrder) {
        return removeFromOrder(id);
      }
    }
  };
  return (
    <div
      className={`px-8 py-4 border hover:border-gray-800 tansition-all ${
        isSelected ? "border-gray-800" : "hover:border-gray-800"
      } }`}
    >
      <div className="mb-5">
        <h3 className="text-lg font-medium">{name}
        {orderStarted && <button onClick={onClick}>{isSelected ? "Remove" : "Add"}</button>}
        </h3>
        <h4 className="font-medium">{descriptions}</h4>
      </div>
      <span>${price}</span>
      {isCustomer && options && options?.length !== 0 && (
        <div>
          <h5 className="my-5 font-medium">Dish Options: </h5>
          {dishOption}
        </div>
      )}
    </div>
  );
};
