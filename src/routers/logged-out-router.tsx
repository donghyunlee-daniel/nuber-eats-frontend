import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Login } from "../pages/user/login";
import { CreateAccount } from "../pages/user/create-account";
import { NotFound } from "../pages/user/404";

export const LoggedOutRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/create-account">
          <CreateAccount />
        </Route>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route>
          <NotFound/>
        </Route>
      </Switch>
    </Router>
  );
};
