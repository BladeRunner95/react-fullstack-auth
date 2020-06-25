import React, {useEffect, useState} from 'react';
import {Route, Redirect, Switch, BrowserRouter as Router, Link} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import * as AuthService from './services/auth.service';
import './App.css';
import Auth from "./components/auth/Auth";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import Profile from "./components/profile/Profile";
import BoardUser from "./components/boardUser/BoardUser";
import BoardModerator from "./components/boardModer/BoardModer";
import BoardAdmin from "./components/boardAdmin/BoardAdmin";
import PrivateRoute from "./components/privateRoute/PrivateRoute";

const App = props => {
    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
            setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
            setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
        }
    }, []);

    const logout = props => {
        AuthService.logout()
    };

    return (
        <Router>
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/home"} className="nav-link">
                                Home
                            </Link>
                        </li>

                        {showModeratorBoard ? (
                            <li className="nav-item">
                                <Link to={"/moderator"} className="nav-link">
                                    Moderator Board
                                </Link>
                            </li>) : showModeratorBoard
                        }

                        {showAdminBoard ? (
                            <li className="nav-item">
                                <Link to={"/admin"} className="nav-link">
                                    Admin Board
                                </Link>
                            </li>) : showAdminBoard
                        }

                        {currentUser ? (
                            <li className="nav-item">
                                <Link to={"/user"} className="nav-link">
                                    User
                                </Link>
                            </li>) : currentUser
                        }
                    </div>

                    {currentUser ? (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/profile"} className="nav-link">
                                    {currentUser.username}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a href="/logout" className="nav-link" onClick={logout}>
                                    Logout
                                </a>
                            </li>
                        </div>
                    ) : (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/login"} className="nav-link">
                                    Login
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to={"/auth"} className="nav-link">
                                    Sign Up
                                </Link>
                            </li>
                        </div>
                    )}

                </nav>

                <div className="container mt-3">
                    <Switch>
                        <Route exact path={["/", "/home"]} component={Home}/>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/auth" component={Auth}/>
                        <Route exact path="/profile" component={Profile}/>
                        {/*<Route path="/user" component={BoardUser}/>*/}
                        <PrivateRoute path="/moder" isAllowed={showModeratorBoard} component={BoardModerator}/>
                        <PrivateRoute path="/admin" isAllowed={showAdminBoard} component={BoardAdmin}/>
                        <PrivateRoute path="/user" isAllowed={currentUser !== null} component={BoardUser}/>
                    </Switch>
                </div>
            </div>
        </Router>
    );

};

export default App;
