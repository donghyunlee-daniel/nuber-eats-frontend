import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import {
  RestaurantsPageQuery,
  RestaurantsPageQueryVariables,
} from "../../gql/graphql";
import { Category } from "../../components/category";
import { Restaurant } from "../../components/restaurant";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet-async";

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

interface IFormProps {
  searchTerm: string;
}

export const Restaurants = () => {
  const [page, setpage] = useState(1);
  const { data, loading } = useQuery<
    RestaurantsPageQuery,
    RestaurantsPageQueryVariables
  >(RESTARUANTS_QUERY, {
    variables: {
      input: {
        page: page,
      },
    },
  });
  const onNextPageClick = () => setpage((current) => current + 1);
  const onPrevPageClick = () => setpage((current) => current - 1);
  const { register, handleSubmit, getValues } = useForm<IFormProps>();
  const history = useHistory();
  const onSearchSubmit = () => {
    const { searchTerm } = getValues();
    history.push({
      pathname: "/search",
      search: `?term=${searchTerm}`
    });
  };
  return (
    <div>
      <Helmet>
        <title>Home | Nuber Eats</title>
      </Helmet>
      <form
        onSubmit={handleSubmit(onSearchSubmit)}
        className="bg-gray-800 w-full py-40 flex items-center justify-center"
      >
        <input
          {...register("searchTerm", { required: true, min: 3 })}
          type="Search"
          className="input w-3/4 md:w-3/12 rounded-md border-0"
          placeholder="Search Restaurants..."
        />
      </form>
      {!loading && (
        <div className="max-w-screen-xl pb-20 mx-auto mt-8">
          <div className="flex justify-around max-w-sm mx-auto">
            {data?.allCategories.categories?.map((category) => (
              <Category
                categoryName={category.name}
                coverImg={category.coverImg}
                key={category.id}
              />
            ))}
          </div>
          <div className="grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
            {data?.restaurants.results?.map((restaurant) => (
              <Restaurant
                key={restaurant.id}
                id={restaurant.id + ""}
                coverImg={restaurant.coverImg}
                name={restaurant.name}
                categoryName={restaurant.category?.name}
              />
            ))}
          </div>
          <div className="grid grid-cols-3 text-center max-w-md items-center mx-auto mt-10">
            {page > 1 ? (
              <button
                className="focus:online-none font-bold text-2xl"
                onClick={onPrevPageClick}
              >
                &larr;
              </button>
            ) : (
              <div></div>
            )}
            <span>
              page {page} of {data?.restaurants.totalPages}
            </span>
            {page !== data?.restaurants.totalPages ? (
              <button
                className="focus:online-none font-bold text-2xl"
                onClick={onNextPageClick}
              >
                &rarr;
              </button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
