import { gql, useMutation } from "@apollo/client";
import React from "react";
import {
  CreateRestaurantMutation,
  CreateRestaurantMutationVariables,
} from "../../gql/graphql";
import { useForm } from "react-hook-form";
import { Button } from "../../components/button";
import { Helmet } from "react-helmet-async";

const CREATE_RESTAURANT = gql`
  mutation createRestaurant($input: CreateRestaurantInput!) {
    createRestaurant(input: $input) {
      ok
      error
    }
  }
`;

interface IFormProps {
  name: string;
  address: string;
  categoryName: string;
}

export const AddRestaurant = () => {
  const [createRestaurantMutation, { loading, data }] = useMutation<
    CreateRestaurantMutation,
    CreateRestaurantMutationVariables
  >(CREATE_RESTAURANT);

  const { register, getValues, formState, handleSubmit } =
    useForm<IFormProps>({mode:"onChange"});
  const onSubmit = () => {
    console.log(getValues());
  };
  return (
    <div className="container">
        <Helmet>
            <title>Add Restaurant | Nuber Eats</title>
        </Helmet>
      <h1>Add Restaurants</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="input"
          {...register("name", { required: "Name is required." })}
          name="name"
          placeholder="Name"
          type="text"
        />
        <input
          className="input"
          {...register("address", { required: "Address is required." })}
          name="address"
          placeholder="Address"
          type="text"
        />
        <input
          className="input"
          {...register("categoryName", {
            required: "CategoryName is required.",
          })}
          name="categoryName"
          placeholder="Category Name"
          type="text"
        />
        <Button
          loading={loading}
          canClick={formState.isValid}
          actionText="Create Restaurant"
        />
      </form>
    </div>
  );
};
