import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LandingPage from "./componenets/views/LandingPage/LandingPage";
import LoginPage from "./componenets/views/LoginPage/LoginPage";
import RegisterPage from "./componenets/views/RegisterPage/RegisterPage";

function App() {
  return (
    <Router>
      <Route exact path="/" component={LandingPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
    </Router>
  );
}

export default App;
