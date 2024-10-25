import { gql, useQuery } from "@apollo/client";
import React from "react";
import { RestaurantsPageQuery, RestaurantsPageQueryVariables } from "../../gql/graphql";

const RESTARUANTS_QUERY = gql`
  query restaurantsPage($input: RestaurantsInput!) {
    allCategories {
      ok
      error
      categories {
        id
        name
        coverImg
        slug
        restaurantCount
      }
    }
    restaurants(input: $input) {
      ok
      error
      totalPages
      totalResults
      results {
        id
        name
        coverImg
        category {
          name
        }
        address
        isPromoted
      }
    }
  }
`;

export const Restaurants = () => {
    const {data, loading, error} = useQuery<RestaurantsPageQuery,RestaurantsPageQueryVariables>(RESTARUANTS_QUERY,{
        variables:{
            input:{
                page:1
            }
        }
    })
    
    return <h1>Restaurants</h1>
}
