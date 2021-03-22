import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./app/components/Home";
import Welcome from "./app/components/Welcome";
import SignUp from "./app/components/SignUp";
import Login from "./app/components/Login";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/welcome" exact={true} component={Welcome} />
          <Route path="/login" exact={true} component={Login} />
          <Route path="/signup" exact={true} component={SignUp} />
        </Switch>
      </Router>
    );
  }
}

export default App;
