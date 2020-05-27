import React from 'react';
import {Route, Redirect, Switch, BrowserRouter as Router, Link} from 'react-router-dom';
import './App.css';
import Auth from "./containers/auth/Auth";
import Logout from "./containers/logout/Logout";
import Menu from "./containers/menu/Menu";
import Welcome from "./containers/welcome/Welcome";

const App = props => {

  let routes = (
      <Switch>
        <Route path="/login" component={Auth}/>
        <Route path="/" exact component={Welcome}/>
        <Redirect to="/"/>
      </Switch>
  );
  if (props.isAuth) {
    routes = (
        <Switch>
          <Route path="/menu" component={Menu}/>
          <Route path="/logout" component={Logout}/>
        </Switch>
    );
  }

  return (
      <Router classname={App}>
          <div>
              <ul>
                  <li>
                      <Link to="/">Home Page</Link>
                  </li>
                  <li>
                      <Link to="/login">Login</Link>
                  </li>
                  <span className="indicator"></span>
              </ul>

    <div className="App">
        {routes}
    </div>
          </div>
      </Router>

  );
};

export default App;
