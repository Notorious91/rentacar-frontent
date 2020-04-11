import React from 'react';
import Home from './pages/Home';
import Error from "./pages/Error";
import Forbidden from "./pages/Forbidden";
import NotFound from "./pages/NotFound";

import { Route } from 'react-router-dom';
import { isUserLoggedIn } from "./base/OAuth";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import Lock from "./pages/user/Lock";
import UserList from "./pages/admin/users/UserList";
import CarCategoryList from './pages/admin/carCategories/CarCategoryList';
import CarModelList from './pages/admin/carModels/CarModelList';
import CarList from './pages/admin/cars/CarList';
import PartList from './pages/admin/parts/PartList';
import OrderList from './pages/admin/orders/OrderList';

let ROUTES = {
    Home: {
        path: '/',
        component: <Home/>,
        auth: true
    },
    Error: {
        path: '/error',
        component: <Error/>,
        auth: false
    },
    Forbidden: {
        path: '/forbidden',
        component: <Forbidden/>,
        auth: false
    },
    NotFound: {
        path: '/not-found',
        component: <NotFound/>,
        auth: false
    },
    Login: {
        path: '/login',
        component: <Login/>,
        auth: false
    },
    Register: {
        path: '/register',
        component: <Register/>,
        auth: false
    },
    Lock: {
        path: '/lock',
        component: <Lock/>,
        auth: false
    },
    UserList: {
        path: '/users',
        component: <UserList showFilter={ false }/>,
        auth: true
    },
    CarCategoryList: {
        path: '/carCategories',
        component: <CarCategoryList showFilter={ false }/>,
        auth: true
    },
    CarModelList: {
        path: '/carModels',
        component: <CarModelList showFilter={ false }/>,
        auth: true
    },
    CarList: {
        path: '/cars',
        component: <CarList showFilter={ false }/>,
        auth: true
    },
    PartList: {
        path: '/parts',
        component: <PartList showFilter={ false }/>,
        auth: true
    },
    OrderList: {
        path: '/orders',
        component: <OrderList showFilter={ false }/>,
        auth: true
    }
    
};

export default ROUTES;

function getRoute(path) {

    for(const [key, value] of Object.entries(ROUTES)) {

        if(value.path === path) {
            return value;
        }
    }

    return null;
}

export function checkPath(path) {

    let pathObject = getRoute(path);

    if(!pathObject) {
        return true;
    }

    if(pathObject.auth) {
        return !isUserLoggedIn();
    }

    return false;
}

export function getRoutes() {

    let result = [];

    for(const [key, value] of Object.entries(ROUTES)) {

        result.push(
            <Route key={ 'route-' + result.length } exact path={ value.path } render={() => (
                value.component
            )}/>
        )
    }

    return result;
}