import React from "react";
import { Switch, Route } from "react-router-dom";
import Resources from "./Resources";
import Dashboard from "./Dashboard";

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route path="/resources" component={Resources} />      
    </Switch>
  </main>
);
export default Main;