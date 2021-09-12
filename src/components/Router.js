import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";

import Spinner from "./Spinner";

import * as routes from "../shared/routes";
import { ProvideAuth } from "./AuthConext";
import { PrivateRoute } from "./PrivateRoute";

const Login = lazy(() => import("../pages/Login/Login"));
const Signup = lazy(() => import("../pages/Signup/Signup"));
const HomePage = lazy(() => import("../pages/Website/Home"));
const UserManagement = lazy(() => import("../pages/Hospital/user-management"));
const HospitalDash = lazy(() => import("../pages/Hospital/dashboard"));

function PlaceholderForProtectedRoute() {
    return (
        <div>This is an protected page</div>
    )
}

const Router = () => {

    return (
        <Suspense fallback={<Spinner />}>
            <ProvideAuth>
                <Switch>
                    <Route exact path={routes.HOMEPAGE} component={HomePage} />
                    <Route exact path={routes.USERMANAGEMENT} component={UserManagement} />
                    <Route exact path={routes.HOSDASH} component={HospitalDash} />
                    <Route exact path={routes.LOGIN} component={Login} />
                    <Route exact path={routes.SIGNUP} component={Signup} />
                    {/* <Route exact path="/" component={NotFound}/> */}
                    {/* <Route path={routes.PUBLIC} component={NotFound}/> */}
                    <PrivateRoute exact path={routes.PROTECTED} component={PlaceholderForProtectedRoute} />
                    {/* <Route component={NotFound} /> */}
                </Switch>
            </ProvideAuth>
        </Suspense>
    );
};

export default Router;