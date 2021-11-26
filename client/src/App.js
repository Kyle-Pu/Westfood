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
import RestaurantsPage from "./pages/restaurants";
import Cookie from "universal-cookie";

require('dotenv').config();

const logout = () => {
  console.log("logging out")
  const cookie = new Cookie();
  cookie.remove('user');
  window.location.reload()
}


function App(props) {
  return (
    <Router>
      <Switch>
        <Route 
          exact path="/"
          render={() => <HomePage logOut={logout} user_id_cookie={props.userIdCookie} />}  
        />
        <Route
          exact path="/users" 
          render={() => <UsersPage logOut={logout} user_id_cookie={props.userIdCookie} />}
        />
        <Route
          exact path="/404" 
          render={() => <NotFoundPage logOut={logout} user_id_cookie={props.userIdCookie} />}
        />
        <Route
          exact path="/users" 
          render={() => <UsersPage logOut={logout} user_id_cookie={props.userIdCookie} />}
        />
        <Route
          exact path="/login" 
          render={() => <LoginPage logOut={logout} user_id_cookie={props.userIdCookie} />}
        />
        <Route
          exact path="/register" 
          render={() => <RegisterPage logOut={logout} user_id_cookie={props.userIdCookie} />}
        />
        <Route
          exact path="/restaurants" 
          render={() => <RestaurantsPage logOut={logout} user_id_cookie={props.userIdCookie} />}
        />
      </Switch>
    </Router>
  );
}

export default App;
