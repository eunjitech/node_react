import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LandingPage from "./componenets/views/LandingPage/LandingPage";
import LoginPage from "./componenets/views/LoginPage/LoginPage";
import RegisterPage from "./componenets/views/RegisterPage/RegisterPage";
import Auth from "./hoc/auth";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Auth(LandingPage, null)} />
      <Route path="/login" component={Auth(LoginPage, false)} />
      <Route path="/register" component={Auth(RegisterPage, false)} />
    </Router>
  );
}

export default App;
