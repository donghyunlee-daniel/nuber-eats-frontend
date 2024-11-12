import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { FormError } from "../../components/form-error";
import { ApolloError, gql, useMutation } from "@apollo/client";
import nuberLogo from "../../images/logo.svg";
import { Button } from "../../components/button";
import { Link, useHistory } from "react-router-dom";
import {
  CreateAccountMutation,
  CreateAccountMutationVariables,
  UserRole,
} from "../../gql/graphql";

export const CREATE_ACCOUNT_MUTATION = gql`
  mutation CreateAccount($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`;

interface ICreateAccountForm {
  email: string;
  password: string;
  role: UserRole;
}

export const CreateAccount = () => {
  const { register, getValues, formState, handleSubmit } =
    useForm<ICreateAccountForm>({
      defaultValues: {
        role: UserRole.Client,
      },
      mode:"onChange"
    });
  const history = useHistory();
  const onCompleted = (data: CreateAccountMutation) => {
    const {
      createAccount: { ok, error },
    } = data;
    if (ok) {
      alert("Account Created! Log in now!");
      history.push("/");
    }
  };
  const [
    createAccountMutation,
    { loading, data: createAcctountMutationResult },
  ] = useMutation<CreateAccountMutation, CreateAccountMutationVariables>(
    CREATE_ACCOUNT_MUTATION,
    { onCompleted }
  );
  const onSubmit = () => {
    if (!loading) {
      const { email, password, role } = getValues();
      createAccountMutation({
        variables: {
          createAccountInput: { email, password, role },
        },
      });
    }
  };

  return (
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
      <Helmet>
        <title>Create Account | Nuber Eats</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
        <img src={nuberLogo} className="w-52 mb-10" alt="Nuber Eats" />
        <h4 className="w-full font-semibold text-left text-3xl mb-5">
          Let's get started
        </h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 mt-5  w-full mb-5"
        >
          <input
            {...register("email", {
              required: "Email is required",
              pattern:
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            name="email"
            type="email"
            placeholder="Email"
            className="input"
          />
          {formState.errors.email?.message && (
            <FormError errorMessage={formState.errors.email?.message} />
          )}
          {formState.errors.email?.type === "pattern" && (
            <FormError errorMessage={"Please enter a valid email"} />
          )}
          <input
            {...register("password", {
              required: "Password is required",
            })}
            name="password"
            type="password"
            placeholder="password"
            className="input"
          />
          {formState.errors.password?.message && (
            <FormError errorMessage={formState.errors.password.message} />
          )}
          <select {...register("role", { required: true })} className="input">
            {Object.keys(UserRole).map((role, index) => (
              <option key={index}>{role}</option>
            ))}
          </select>
          <Button
            canClick={formState.isValid}
            loading={loading}
            actionText={"Create Account"}
          />
          {createAcctountMutationResult?.createAccount.error && (
            <FormError
              errorMessage={createAcctountMutationResult.createAccount.error}
            />
          )}
        </form>
        <div>
          Already have an account?{" "}
          <Link to="/" className="text-lime-600 hover:underline">
            Log in now
          </Link>
        </div>
      </div>
    </div>
  );
};
