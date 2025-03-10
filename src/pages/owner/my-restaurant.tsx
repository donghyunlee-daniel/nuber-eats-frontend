import { gql, useQuery, useSubscription } from "@apollo/client";
import React, { useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import {
  DISH_FRAGMENT,
  FULL_ORDER_FRAGMENT,
  ORDERS_FRAGMENT,
  RESTAURANT_FRAGMENT,
} from "../../fragments";
import {
  MyRestaurantQuery,
  MyRestaurantQueryVariables,
  PendingOrdersSubscription,
} from "../../gql/graphql";
import { Dish } from "../../components/dish";
import {
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryTheme,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from "victory";

export const MY_RESTAURANT = gql`
  query myRestaurant($input: MyRestaurantInput!) {
    myRestaurant(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantParts
        menu {
          ...DishParts
        }
        orders {
          ...OrderParts
        }
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${DISH_FRAGMENT}
  ${ORDERS_FRAGMENT}
`;


const PENDING_ORDERS = gql`
  subscription pendingOrders{
    pendingOrders{
      ...FullOrderParts
    }
  }
  ${FULL_ORDER_FRAGMENT}
`

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

  const {data: subscriptionData} = useSubscription<PendingOrdersSubscription>(PENDING_ORDERS)
  const history = useHistory()
  useEffect(()=>{
    if(subscriptionData?.pendingOrders.id){
      history.push(`/orders/${subscriptionData.pendingOrders.id}`)
    }
  },[subscriptionData])

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
          ) : (
            <div className="grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
              {data?.myRestaurant.restaurant?.menu.map((dish, index) => (
                <Dish
                  name={dish.name}
                  descriptions={dish.description}
                  price={dish.price}
                  key={index}
                />
              ))}
            </div>
          )}
        </div>
        <div className="mt-20 mb-10">
          <h4 className="text-center text-2xl font-medium">Sales</h4>
          <div className="mt-10">
            <VictoryChart
              theme={VictoryTheme.material}
              height={500}
              width={window.innerWidth}
              domainPadding={50}
              containerComponent={<VictoryVoronoiContainer />}
            >
              <VictoryLine
                labels={({ datum }) => `$${datum.y}`}
                labelComponent={
                  <VictoryTooltip
                    style={{ fontSize: 17 }}
                    renderInPortal
                    dy={-20}
                  />
                }
                style={{
                  data: {
                    strokeWidth: 5,
                    stroke: "#4D7C0F",
                  },
                }}
                interpolation="natural"
                data={data?.myRestaurant.restaurant?.orders.map((order) => ({
                  x: order.createdAt,
                  y: order.total,
                }))}
              />
              <VictoryAxis
              tickLabelComponent={<VictoryLabel renderInPortal/>}
                style={{
                  tickLabels: { fontSize: 15, fill: "#4D7C0F", },
                  
                }}
                tickFormat={(tick) => new Date(tick).toLocaleDateString()}
              />
            </VictoryChart>
          </div>
        </div>
      </div>
    </div>
  );
};
