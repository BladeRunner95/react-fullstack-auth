import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// import { isLogin } from '../utils';

const PrivateRoute = ({component: Component, isAllowed, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            isAllowed ?
                <Component {...props} />
                : <Redirect to="/" />
        )} />
    );
};
export default PrivateRoute;