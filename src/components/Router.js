import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";

import Spinner from "./Spinner";

import * as routes from "../shared/routes";
import { ProvideAuth } from "./AuthConext";
import { PrivateRoute } from "./PrivateRoute";

const Login = lazy(() => import("../pages/Login/Login"));
const Signup = lazy(() => import("../pages/Signup/Signup"));

function PlaceholderForProtectedRoute() {
    return(
      <div>This is an protected page</div>
      )
  }

const Router = () => {

    return (
        <Suspense fallback={<Spinner />}>
            <ProvideAuth>
            <Switch>
                <Route exact path={routes.LOGIN} component={Login} />
                <Route exact path={routes.SIGNUP} component={Signup} />
                {/* <Route exact path="/" component={NotFound}/> */}
                {/* <Route path={routes.PUBLIC} component={NotFound}/> */}
                <PrivateRoute exact path={routes.PROTECTED} component={PlaceholderForProtectedRoute}/>
                {/* <Route component={NotFound} /> */}
            </Switch>
            </ProvideAuth>
        </Suspense>
    );
};

export default Router;