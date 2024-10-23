import React from "react";
import { isLoggedInVar } from "../apollo";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { MeQuery } from "../gql/graphql";
import { Restaurants } from "../pages/client/restaurants";

const ClientRoutes = [
    <Route path="/" exact>
      <Restaurants />
    </Route>
];

const ME_QUERY = gql`
  query me {
    me {
      id
      email
      role
      verified
    }
  }
`;

export const LoggedInRouter = () => {
  const { data, loading, error } = useQuery<MeQuery>(ME_QUERY);
  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">Loading...</span>
      </div>
    );
  }
  return (
    <Router>
      <Switch>
        {data.me.role === "Client" && ClientRoutes}
      <Redirect to="/"/>
      </Switch>
    </Router>
  );
};
