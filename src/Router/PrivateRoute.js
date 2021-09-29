import React from 'react';
import {Navigate, Route} from 'react-router-dom';

const PrivateRoute = ({component: Component, redirectTo, isAdmin, path, ...props}) => {
    if (!isAdmin) {
        return <Navigate to={redirectTo}/>;
    }
    return <Route path={path} element={<Component {...props} />}/>
};
export default PrivateRoute;