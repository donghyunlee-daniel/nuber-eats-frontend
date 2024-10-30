import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useHistory, useLocation } from "react-router-dom";
import { RESTAURANT_FRAGMENT } from "../../fragments";
import { SearchRestaurantQuery, SearchRestaurantQueryVariables } from "../../gql/graphql";

const SEARCH_RESTAURANT = gql`
  query searchRestaurant($input: SearchRestaurantInput!) {
    searchRestaurant(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

export const Search = () => {
  const location = useLocation();
  const history = useHistory();
  const [callQuery, {loading, data, called}] = useLazyQuery<SearchRestaurantQuery,SearchRestaurantQueryVariables>(SEARCH_RESTAURANT);
  useEffect(() => {
    const [_, query] = location.search.split("?term=");
    if (!query) {
      return history.replace("/");
    }
    callQuery({
        variables:{
            input:{
                page:1,
                query
            }
        }
    })
  }, []);
  console.log(loading, data, called);
  return (
    <h1>
      <Helmet>
        <title>Home | Nuber Eats</title>
      </Helmet>
      search Page
    </h1>
  );
};
