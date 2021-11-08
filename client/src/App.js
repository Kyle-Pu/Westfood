import React from "react";
import './App.css';
import{
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

// Import pages
import HomePage from "./pages/home"; // home.jsx will be imported
import UsersPage from "./pages/users";
import NotFoundPage from "./pages/404";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/users" component={UsersPage} />
        <Route exact path="/404" component={NotFoundPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/login" component={LoginPage} />
        <Redirect to="/404" />
      </Switch>
    </Router>
  );
}

export default App;
