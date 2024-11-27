import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { DISH_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
import {
  MyRestaurantQuery,
  MyRestaurantQueryVariables,
} from "../../gql/graphql";
import { Dish } from "../../components/dish";

export const MY_RESTAURANT = gql`
  query myRestaurant($input: MyRestaurantInput!) {
    myRestaurant(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantParts
        menu{
            ...DishParts
        }
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${DISH_FRAGMENT}
`;

interface IParams {
  id: string;
}

export const MyRestaurant = () => {
  const { id } = useParams<IParams>();
  const { data } = useQuery<MyRestaurantQuery, MyRestaurantQueryVariables>(
    MY_RESTAURANT,
    {
      variables: {
        input: {
          id: +id,
        },
      },
    }
    );
    console.log(data);
  return (
    <div>
      <div
        className="bg-gray-700 py-28 bg-center bg-cover"
        style={{
          backgroundImage: `url(${data?.myRestaurant.restaurant?.coverImg})`,
        }}
      ></div>
      <div className="container mt-10">
        <h2 className="text-4xl font-medium mb-10">
          {data?.myRestaurant.restaurant?.name || "Loading..."}
        </h2>
        <Link
          to={`/restaurants/${id}/add-dish`}
          className="mr-8 text-white bg-gray-800 py-3 px-10"
        >
          Add Dish &rarr;
        </Link>
        <Link to={``} className="text-white bg-lime-700 py-3 px-10">
          Buy Promotion &rarr;
        </Link>
        <div className="mt-10">
          {data?.myRestaurant.restaurant?.menu.length === 0 ? (
            <h4 className="text-xl mb-5">Please upload a dish!</h4>
          ) :<div className="grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
            {data?.myRestaurant.restaurant?.menu.map(dish => <Dish name={dish.name} descriptions={dish.description} price={dish.price}/>)}
          </div>
        }
        </div>
      </div>
    </div>
  );
};
