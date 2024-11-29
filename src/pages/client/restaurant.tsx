import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { DISH_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
import {
  CreateOrderItemInput,
  CreateOrderMutation,
  CreateOrderMutationVariables,
  RestaurantQuery,
  RestaurantQueryVariables,
} from "../../gql/graphql";
import { Dish } from "../../components/dish";
import { Helmet } from "react-helmet-async";
import { DishOption } from "../../components/dish-option";

const RESTAURANT_QUERY = gql`
  query restaurant($input: RestaurantInput!) {
    restaurant(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantParts
        menu {
          ...DishParts
        }
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${DISH_FRAGMENT}
`;

const CREATE_ORDER = gql`
  mutation createOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      ok
      error
      orderId
    }
  }
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
  const [orderStarted, setOrderStarted] = useState(false);
  const [orderItems, setOrderItems] = useState<CreateOrderItemInput[]>([]);
  const triggerStartOrder = () => {
    setOrderStarted(true);
  };
  const getItem = (dishId: number) => {
    return orderItems.find((order) => order.dishId === dishId);
  };
  const isSelected = (dishId: number) => {
    return Boolean(getItem(dishId));
  };
  const addItemToOrder = (dishId: number) => {
    if (isSelected(dishId)) {
      return;
    }
    setOrderItems((current) => [{ dishId, options: [] }, ...current]);
  };
  const removeFromOrder = (dishId: number) => {
    setOrderItems((current) =>
      current.filter((dish) => dish.dishId !== dishId)
    );
  };
  const addOptionToItem = (dishId: number, optionName: string) => {
    if (!isSelected(dishId)) {
      return;
    }
    const oldItem = getItem(dishId);
    if (oldItem) {
      const hasOption = Boolean(
        oldItem.options?.find((aOption) => aOption.name == optionName)
      );
      if (!hasOption) {
        removeFromOrder(dishId);
        setOrderItems((current) => [
          { dishId, options: [{ name: optionName }, ...oldItem.options!] },
          ...current,
        ]);
      }
    }
  };
  const removeOptionFromItem = (dishId: number, optionName: string) => {
    if (!isSelected(dishId)) {
      return;
    }
    const oldItem = getItem(dishId);
    if (oldItem) {
      removeFromOrder(dishId);
      setOrderItems((current) => [
        {
          dishId,
          options: oldItem.options?.filter(
            (option) => option.name !== optionName
          ),
        },
        ...current,
      ]);
      return;
    }
  };
  const getOptionFromItem = (
    item: CreateOrderItemInput,
    optionName: string
  ) => {
    return item.options?.find((option) => option.name === optionName);
  };
  const isOptionSelected = (dishId: number, optionName: string) => {
    const item = getItem(dishId);
    if (item) {
      return Boolean(getOptionFromItem(item, optionName));
    }
    return false;
  };

  const triggerCancelOrder = () => {
    setOrderStarted(false);
    setOrderItems([]);
  };
  const history = useHistory();
  const onCompleted = (data:CreateOrderMutation) => {
    if(data.createOrder.ok){
      alert("order created");
      const {createOrder: {ok, orderId} } = data;
      history.push(`/orders/${orderId}`)
    }
  }
  const [createOrderMutation, { loading: placingOrder }] = useMutation<
    CreateOrderMutation,
    CreateOrderMutationVariables
  >(CREATE_ORDER,{onCompleted});
  const triggerConfirmOrder = () => {
    if (orderItems.length === 0) {
      alert("Can't place empty order");
      return;
    }
    // Should show the list of orders and price
    const ok = window.confirm("You are about to place an order");
    if (ok) {
      createOrderMutation({
        variables:{
          input: {
            restaurantId: +params.id,
            items: orderItems
          }
        }
      })
    }
  };
  return (
    <div>
      <Helmet>
        <title>{data?.restaurant.restaurant?.name || ""}</title>
      </Helmet>
      <div
        className="bg-gray-800 py-40 bg-center bg-cover"
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
      <div className="container pb-32 flex flex-col items-end mt-20">
        {!orderStarted && (
          <button onClick={triggerStartOrder} className="btn px-10">
            Start Order
          </button>
        )}
        {orderStarted && (
          <div className="flex items-center">
            <button onClick={triggerConfirmOrder} className="btn px-10 mr-3">
              Confirm Order
            </button>
            <button
              onClick={triggerCancelOrder}
              className="btn px-10 bg-black hover:bg-black"
            >
              Cancel Order
            </button>
          </div>
        )}

        <div className="w-full grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
          {data?.restaurant.restaurant?.menu.map((dish, index) => (
            <Dish
              isSelected={isSelected(dish.id)}
              id={dish.id}
              orderStarted={orderStarted}
              name={dish.name}
              descriptions={dish.description}
              price={dish.price}
              isCustomer={true}
              options={dish.options}
              key={index}
              addItemToOrder={addItemToOrder}
              removeFromOrder={removeFromOrder}
            >
              {dish.options?.map((option, index) => (
                <DishOption
                  key={index}
                  dishId={dish.id}
                  isSelected={isOptionSelected(dish.id, option.name)}
                  name={option.name}
                  extra={option.extra}
                  addOptionToItem={addOptionToItem}
                  removeOptionFromItem={removeOptionFromItem}
                />
              ))}
            </Dish>
          ))}
        </div>
      </div>
    </div>
  );
};
