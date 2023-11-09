import React from "react";
import { isLoggedInVar } from "../apollo";
import { useForm } from "react-hook-form";

interface IForm {
  email: string;
  password: string;
}

export const LoggedOutRouter = () => {
  const { register, watch, handleSubmit } = useForm<IForm>();
  const {
    formState: { errors },
  } = useForm();
  const onSubmit = () => {
    console.log(watch());
  };
  const onInvalid = () => {
    console.log("can't create account");
  };

  return (
    <div>
      <h1>Logged Out</h1>
      <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <div>
          <input
            {...register("email", {
              required: "This is required",
              pattern: /^[A-Za-z0-o._%+-]+@gmail.com$/,
            })}
            name="email"
            type="email"
            placeholder="email"
          />
          
        </div>
        <div>
          <input
            name="password"
            type="password"
            required
            placeholder="password"
          />
        </div>
        <button className="bg-yellow-300 text-white">Submit</button>
      </form>
    </div>
  );
};
