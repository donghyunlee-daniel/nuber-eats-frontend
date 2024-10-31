import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
import { CategoryQuery, CategoryQueryVariables } from "../../gql/graphql";
import { Helmet } from "react-helmet-async";
import { CategoryComp } from "../../components/category";
import { RestaurantComp } from "../../components/restaurant";

const CATEGORY_QUERY = gql`
  query category($input: CategoryInput!) {
    category(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        ...RestaurantParts
      }
      category {
        ...CategoryParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`;

interface ICategoryParams {
  slug: string;
}

export const Category = () => {
  const [page, setpage] = useState(1);
  const params = useParams<ICategoryParams>();
  const onNextPageClick = () => setpage((current) => current + 1);
  const onPrevPageClick = () => setpage((current) => current - 1);
  const { data, loading } = useQuery<CategoryQuery, CategoryQueryVariables>(
    CATEGORY_QUERY,
    {
      variables: {
        input: {
          page: 1,
          slug: params.slug,
        },
      },
    }
  );
  console.log(data);
  return (
    <div>
      <Helmet>
        <title>Home | Nuber Eats</title>
      </Helmet>
      {!loading && (
        <div className="max-w-screen-xl pb-20 mx-auto mt-8">
          <div className="flex justify-around max-w-sm mx-auto">
            <div className="flex flex-col group items-center cursor-pointer">
              <div
                className="w-16 h-16 bg-cover group-hover:bg-gray-100 rounded-full"
                style={{
                  backgroundImage: `url(${data?.category.category?.coverImg})`,
                }}
              ></div>
              <span className="mt-1 text-sm text-center font-medium">
                {data?.category.category?.name}
              </span>
            </div>
          </div>
          <div className="grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
            {data?.category.restaurants?.map((restaurant) => (
              <RestaurantComp
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
              page {page} of {data?.category.totalPages}
            </span>
            {page !== data?.category.totalPages ? (
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
