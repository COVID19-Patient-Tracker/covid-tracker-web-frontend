import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";

import Spinner from "./Spinner";

import * as routes from "../shared/routes";

const Login = lazy(() => import("../pages/Login/Login"));

const Router = () => {

    return (
        <Suspense fallback={<Spinner />}>
            <Switch>
                <Route exact path={routes.LOGIN} component={Login} />
                {/* <Route component={NotFound} /> */}
            </Switch>
        </Suspense>
    );
};

export default Router;