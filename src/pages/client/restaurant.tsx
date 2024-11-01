import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import { RESTAURANT_FRAGMENT } from "../../fragments";
import { RestaurantQuery, RestaurantQueryVariables } from "../../gql/graphql";

const RESTAURANT_QUERY = gql`
  query restaurant($input: RestaurantInput!) {
    restaurant(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

interface IRestaurantParams {
  id: string;
}

export const Restaurant = () => {
  const params = useParams<IRestaurantParams>();
  const { loading, data } = useQuery<RestaurantQuery, RestaurantQueryVariables>(
    RESTAURANT_QUERY,
    {
      variables: {
        input: {
          restaurantId: +params.id,
        },
      },
    }
  );
  return (
    <div>
      <div
        className="bg-gray-800 py-48 bg-center bg-cover"
        style={{
          backgroundImage: `url(${data?.restaurant.restaurant?.coverImg})`,
        }}
      >
        <div className="bg-white w-2/5 md:w-3/12 md:py-4 md:pl-32">
          <h4 className="text-4xl mb-3">{data?.restaurant.restaurant?.name}</h4>
          <h5 className="text-sm font-light">
            {data?.restaurant.restaurant?.category?.name}
          </h5>
          <h6 className="text-sm font-light mb-2">
            {data?.restaurant.restaurant?.address}
          </h6>
        </div>
      </div>
    </div>
  );
};
