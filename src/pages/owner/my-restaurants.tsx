import { gql, useApolloClient, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { RESTAURANT_FRAGMENT } from "../../fragments";
import {
  MyRestaurantsQuery,
  MyRestaurantsQueryVariables,
} from "../../gql/graphql";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { RestaurantComp } from "../../components/restaurant";

export const MY_RESTAURANTS = gql`
  query myRestaurants {
    myRestaurants {
      ok
      error
      restaurants {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

export const MyRestaurants = () => {
  const { data } = useQuery<MyRestaurantsQuery, MyRestaurantsQueryVariables>(
    MY_RESTAURANTS
  );
  return (
    <div>
      <Helmet>
        <title>My Restaurants | Nuber Eats</title>
      </Helmet>
      <div className="container mt-16">
        <h2 className="text-4xl font-medium mb-10">My Restaurants</h2>
        {data?.myRestaurants.ok &&
          data.myRestaurants.restaurants?.length === 0 ? (
            <>
              <h4 className="text-xl mb-5">You have no restaurants.</h4>
              <Link
                className="text-lime-600 hover:underline"
                to="/add-restaurant"
              >
                Create one &rarr;
              </Link>
            </>
          ):
          <div className="grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
            {data?.myRestaurants.restaurants?.map((restaurant) => (
              <RestaurantComp
                key={restaurant.id}
                id={restaurant.id + ""}
                coverImg={restaurant.coverImg}
                name={restaurant.name}
                categoryName={restaurant.category?.name}
              />
            ))}
          </div>
          }
          
      </div>
    </div>
  );
};
