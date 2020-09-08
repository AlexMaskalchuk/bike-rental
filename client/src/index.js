import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./components/App.js";
import printBike from "./components/PageBike.js";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/Bike/:id" component={printBike} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
