import React from "react";
import { Switch, Route } from "react-router-dom";

import HomePage from "./components/home";
import CreatePoint from "./components/createPoint";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/create-point" component={CreatePoint} />
    </Switch>
  );
};

export default Routes;
