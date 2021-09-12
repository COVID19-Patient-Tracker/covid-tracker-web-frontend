import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { useLocation } from 'react-router-dom';

import Spinner from "./Spinner";

import * as routes from "../shared/routes";
import { ProvideAuth } from "./AuthConext";
import { PrivateRoute } from "./PrivateRoute";

import MohAdminNav from "../components/layout/Navbar/MohAdminNav";
import MohUserNav from "../components/layout/Navbar/MohUserNav";
import HosAdminNav from "../components/layout/Navbar/HosAdminNav";
import HosUserNav from "../components/layout/Navbar/HosUserNav";
import PublicNav from "../components/layout/Navbar/PublicNav";

const Login = lazy(() => import("../pages/Login/Login"));
const Signup = lazy(() => import("../pages/Signup/Signup"));
const HomePage = lazy(() => import("../pages/Website/Home"));
const NotFound = lazy(() => import("../pages/InfoPages/NotFound"));

// moh
const MOHUserManagement = lazy(() => import("../pages/MOH/user-management"));

//hospital
const HospitalUserManagement = lazy(() => import("../pages/Hospital/user-management"));
const HospitalDash = lazy(() => import("../pages/Hospital/dashboard"));
const MOHDash = lazy(() => import("../pages/MOH/dashboard"));

const UploadXray = lazy(() => import("../pages/Hospital/upload-xray"));



function PlaceholderForProtectedRoute() {
    return (
        <div>This is an protected page</div>
    )
}

const Router = () => {

    const location = useLocation();
    const domain = location.pathname.split('/')
    const path1 = domain[1];
    const path2 = domain[2]


    let navbar;
    switch (path1) {
        case "moh":
            if (path2 === "admin") {
                navbar = <MohAdminNav />;
            } else if (path2 === "user") {
                navbar = <MohUserNav />;
            } else {
                navbar = "";
            }
            break;
        case "hospital":
            if (path2 === "admin") {
                navbar = <HosAdminNav />;
            } else if (path2 === "user") {
                navbar = <HosUserNav />;
            } else {
                navbar = "";
            }
            break;
        case "public":
            navbar = <PublicNav />;
            break;
        default:
            navbar = "";
    }

    return (
        <Suspense fallback={<Spinner />}>
            {navbar}
            <ProvideAuth>
                <Switch>
                    {/* general */}
                    <Route exact path={routes.LOGIN} component={Login} />
                    <Route exact path={routes.SIGNUP} component={Signup} />

                    {/* moh-admin */}

                    {/* moh-user */}
                    <Route exact path={routes.MOHUSERMANAGEMENT} component={MOHUserManagement} />
                    <Route exact path={routes.MOHDASH} component={MOHDash} />
                      
                    {/* hospital-admin */}
                    <Route exact path={routes.HOSDASH} component={HospitalDash} />
                    
                    <Route exact path={routes.HOSPITALUSERMANAGEMENT} component={HospitalUserManagement} />


                    {/* hospital-user */}
                    <Route exact path={routes.HOSUSERDASH} component={HospitalDash} />

                    <Route exact path={routes.XRAY} component={UploadXray} />

                    <Route exact path={routes.HOMEPAGE} component={HomePage} />
                    <PrivateRoute exact path={routes.PROTECTED} component={PlaceholderForProtectedRoute} />
                    <Route component={NotFound} />
                </Switch>
            </ProvideAuth>
        </Suspense>
    );
};

export default Router;