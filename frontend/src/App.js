import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import User from "./components/user/User";
import Login from "./components/user/Login";
import Signup from "./components/user/Signup";
import Stocks from "./components/stocks/Stocks";
import Sales from "./components/sales/Sales";
import Reports from "./components/reports/Reports";
import Company from "./components/company/Company";
import Purchase from "./components/purchase/Purchase";
import Dash from "./components/dashboard/Dash";
import DashDesign from "./components/dashboard/DashDesign";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" exact>
          <User>
            <Login />
          </User>
        </Route>
        <Route path="/signup">
          <User>
            <Signup />
          </User>
        </Route>
        <Route path="/company">
          <User>
            <Company />
          </User>
        </Route>
        <Route path="/purchase">
          <Dash>
            <Purchase />
          </Dash>
        </Route>
        <Route path="/sales">
          <Dash>
            <Sales />
          </Dash>
        </Route>
        <Route path="/stocks">
          <Dash>
            <Stocks />
          </Dash>
        </Route>
        <Route path="/reports">
          <Dash>
            <Reports />
          </Dash>
        </Route>
        <Route path="/" exact>
          <Dash>
            <DashDesign />
          </Dash>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
