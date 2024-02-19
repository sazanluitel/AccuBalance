import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import User from "./components/user/User";
import Stocks from "./components/stocks/Stocks";
import Sales from "./components/sales/Sales";
import Reports from "./components/reports/Reports";
import Purchase from "./components/purchase/Purchase";
import Company from "./components/company/Company";
import Dash from "./components/dashboard/Dash";

const App = () => {
  return (
    <>
      <Router>
        <div>
          <Switch>
            <Route path="/user" component={User} />
            <Route path="/stocks" component={Stocks} />
            <Route path="/sales" component={Sales} />
            <Route path="/reports" component={Reports} />
            <Route path="/purchase" component={Purchase} />
            <Route path="/company" component={Company} />
            <Route path="/" component={Dash} />
          </Switch>
        </div>
      </Router>
    </>
  );
};

export default App;
