import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "../../components/button";
import { MY_RESTAURANT } from "./my-restaurant";
import {
  CreateDishMutation,
  CreateDishMutationVariables,
} from "../../gql/graphql";

const CREATE_DISH = gql`
  mutation createDish($input: CreateDishInput!) {
    createDish(input: $input) {
      ok
      error
    }
  }
`;

interface IParams {
  restaurantId: string;
}

interface ICreateDishForm {
  name: string;
  price: string;
  description: string;
}

export const AddDish = () => {
  const {restaurantId} = useParams<IParams>();
  const history = useHistory();
  const [CreateDishMutation, { loading }] = useMutation<
    CreateDishMutation,
    CreateDishMutationVariables
  >(CREATE_DISH, {
    refetchQueries: [{ query: MY_RESTAURANT, variables:{
        input:{
            id: +restaurantId
        }
    } }],
  });
  const { register, handleSubmit, formState, getValues } =
    useForm<ICreateDishForm>({
      mode: "onChange",
    });
  const onSubmit = () => {
    const { name, price, description } = getValues();
    CreateDishMutation({
      variables: {
        input: {
          name,
          price: +price,
          description,
          restaurantId: +restaurantId,
        },
      },
    });
    history.goBack();
  };

  return (
    <div className="container flex flex-col items-center mt-20">
      <Helmet>
        <title>Add Dish | Nuber Eats</title>
      </Helmet>
      <h4 className="font-semibold text-2xl mb-3">Add Dish</h4>
      <form
        className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          className="input"
          {...register("name", { required: "Name is required." })}
          name="name"
          type="text"
          placeholder="Name"
        />
        <input
          className="input"
          {...register("price", { required: "Price is required" })}
          name="price"
          type="number"
          min={0}
          placeholder="Price"
        />
        <input
          className="input"
          {...register("description", { required: "Description is required" })}
          name="description"
          type="text"
          placeholder="Description"
        />
        <Button
          loading={loading}
          canClick={formState.isValid}
          actionText="Create Dish"
        />
      </form>
    </div>
  );
};
