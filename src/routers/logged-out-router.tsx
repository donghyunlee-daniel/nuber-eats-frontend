import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { Login } from "../pages/login";
import { CreateAccount } from "../pages/create-account";

export const LoggedOutRouter = () => {
  return (
    <Router>
      <Switch>
      <Route path="/create-account" >
          <CreateAccount/>
        </Route>
        <Route path="/">
          <Login/>
        </Route>
      </Switch>
    </Router>
  );
};
