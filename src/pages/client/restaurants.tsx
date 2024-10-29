import { gql, useQuery } from "@apollo/client";
import React from "react";
import {
  RestaurantsPageQuery,
  RestaurantsPageQueryVariables,
} from "../../gql/graphql";
import { Category } from "../../components/category";

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
  const { data, loading } = useQuery<
    RestaurantsPageQuery,
    RestaurantsPageQueryVariables
  >(RESTARUANTS_QUERY, {
    variables: {
      input: {
        page: 1,
      },
    },
  });

  return (
    <div>
      <form className="bg-gray-800 w-full py-40 flex items-center justify-center">
        <input
          type="Search"
          className="input w-3/12 rounded-md border-0"
          placeholder="Search Restaurants..."
        />
      </form>
      {!loading && (
        <div className="max-w-screen-xl mx-auto mt-8">
          <div className="flex justify-around max-w-sm mx-auto">
            {data?.allCategories.categories?.map((category, index) => (
              <Category
                categoryName={category.name}
                coverImg={category.coverImg}
                key={index}
              />
            ))}
          </div>
          <div className="grid mt-10 grid-cols-3 gap-x-5 gap-y-10">
            {data?.restaurants.results?.map((restaurant) => (
              <div>
                <div className="py-28 bg-cover bg-center mb-3" style={{backgroundImage: `url(${restaurant.coverImg})`}}></div>
                <h3 className="text-xl font-medium">{restaurant.name}</h3>
                <span className="border-t-2 border-gray-200">{restaurant.category?.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
