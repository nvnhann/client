import React from 'react';
import {Navigate, Route} from 'react-router-dom';

const ProtectRoute = ({component: Component, redirectTo, isLogin, path, ...props}) => {
    if (!isLogin) {
        return <Navigate to={redirectTo}/>;
    }
    return <Route path={path} element={<Component {...props} />}/>
};
export default ProtectRoute;