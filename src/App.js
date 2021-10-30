import React from "react";
import './App.css';
import{
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";

// Import pages
import HomePage from "./pages/home"; // home.jsx will be imported
import UsersPage from "./pages/users";
import NotFoundPage from "./pages/404";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/users" component={UsersPage} />
        <Route exact path="/404" component={NotFoundPage} />
        <Redirect to="/404" />
      </Switch>
    </Router>
  );
}

export default App;
