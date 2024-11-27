import React from "react";

interface IDishProps{
    descriptions: string;
    name: string;
    price: number;
}

export const Dish:React.FC<IDishProps> = ({descriptions, name, price}) => {
    return <div className="px-8 pt-4 border hover:border-gray-800 tansition-all">
        <div className="mb-5">
            <h3 className="text-lg font-medium">{name}</h3>
            <h4 className="font-medium">{descriptions}</h4>
        </div>
        <span>${price}</span>
        </div>
}