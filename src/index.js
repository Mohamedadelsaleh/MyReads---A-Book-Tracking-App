import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SearchingPage from "./Components/SearchingPage"

const ProjectRouts = () => (
  <Switch>
    <Route exact path="/">
      <App />
    </Route>
    <Route path="/search">
      <SearchingPage />
    </Route>
  </Switch>
)


ReactDOM.render(
  <Router>
    <ProjectRouts />
  </Router>,
  document.getElementById("root")
);
