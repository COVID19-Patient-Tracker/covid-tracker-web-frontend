import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { useLocation } from 'react-router-dom';

import Spinner from "./Spinner";

import * as routes from "../shared/routes";
import * as roles from "../shared/roles";

import { ProvideAuth } from "./AuthConext";
import { PrivateRoute } from "./PrivateRoutes/PrivateRoute";

import MohAdminNav from "../components/layout/Navbar/MohAdminNav";
import MohUserNav from "../components/layout/Navbar/MohUserNav";
import HosAdminNav from "../components/layout/Navbar/HosAdminNav";
import HosUserNav from "../components/layout/Navbar/HosUserNav";
import PublicNav from "../components/layout/Navbar/PublicNav";

<<<<<<< HEAD
const Login = lazy(() => import("../pages/General/Login"));
const Signup = lazy(() => import("../pages/General/Signup"));
=======
const Login = lazy(() => import("../pages/Login/Login"));
>>>>>>> dev
const NotFound = lazy(() => import("../pages/InfoPages/NotFound"));

//website
const HomePage = lazy(() => import("../pages/Website/Home"));
const Guideline = lazy(() => import("../pages/Website/Guidelines"));
const WebNews = lazy(() => import("../pages/Website/News"));
const VaccineProgram = lazy(() => import("../pages/Website/Vaccination"));

// moh
const MOHUserManagement = lazy(() => import("../pages/MOH/user-management"));
const MOHDash = lazy(() => import("../pages/MOH/dashboard"));

//hospital Admin
const HospitalUserManagement = lazy(() => import("../pages/Hospital/Admin/user-management"));
const HospitalDash = lazy(() => import("../pages/Hospital/dashboard"));
const HospitalProfile  = lazy(() => import("../pages/Hospital/Admin/hospitalProfile"));

const UploadXray = lazy(() => import("../pages/Hospital/upload-xray"));
const PatientManagement = lazy(() => import("../pages/Hospital/Report_dashboard"));
const Repo = lazy(() => import("../pages/Hospital/report_main"));
const RepoStatus = lazy(() => import("../pages/Hospital/report_status"));
const RepoHos = lazy(() => import("../pages/Hospital/report_hos_trans"));
const RepoWard = lazy(() => import("../pages/Hospital/report_ward_trans"));
const RepoTest = lazy(() => import("../pages/Hospital/report_test_result"));
const AdmitRepo = lazy(() => import("../pages/Hospital/Reports/Admit_Details/admit_report_main"));
const HospitalTrans = lazy(() => import("../pages/Hospital/Reports/Hospital_Transfer/hospital_transfer_main"));
const Status = lazy(() => import("../pages/Hospital/Reports/Patient_Status/current_status_main"));
const Test = lazy(() => import("../pages/Hospital/Reports/PCR_Antigen_Results/pcr_antigen_main"));
const WardTrans = lazy(() => import("../pages/Hospital/Reports/Ward_Transfer/ward_transfer_main"));
const CompleteReport = lazy(() => import("../pages/Hospital/update_patient_detal"));
const AddPatient = lazy(() => import("../pages/Hospital/addPatient"));

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

                    {/* moh-admin */}

                    {/* moh-user */}
                    <PrivateRoute exact path={routes.MOHUSERMANAGEMENT} component={MOHUserManagement} AuthorizedUserRoles={[roles.MOH_ADMIN]}/>
                    <PrivateRoute exact path={routes.MOHDASH} component={MOHDash} AuthorizedUserRoles={[roles.MOH_USER, roles.MOH_ADMIN]}/>
                      
                    {/* hospital-admin */}
                    <Route exact path={routes.HOSDASH} component={HospitalDash} />
                    <Route exact path={routes.HOSPITALUSERMANAGEMENT} component={HospitalUserManagement} />
                    <Route exact path={routes.HOSPROFILE} component={HospitalProfile} />


                    {/* hospital-user */}
                    <PrivateRoute exact path={routes.HOSUSERDASH} component={HospitalDash} AuthorizedUserRoles={[roles.HOSPITAL_ADMIN,roles.HOSPITAL_USER]}/>
                    <Route exact path={routes.XRAY} component={UploadXray} />
                    <Route exact path={routes.REPODASH} component={PatientManagement}/>
                    <Route exact path={routes.REPO} component={Repo}/>
                    <Route exact path={routes.REPOSTATUS} component={RepoStatus}/>
                    <Route exact path={routes.REPOHOS} component={RepoHos}/>
                    <Route exact path={routes.REPOWARD} component={RepoWard}/>
                    <Route exact path={routes.REPOTEST} component={RepoTest}/>
                    <Route exact path={routes.ADMITREPO} component={AdmitRepo}/>
                    <Route exact path={routes.HOSPITALTRANS} component={HospitalTrans}/>
                    <Route exact path={routes.STATUS} component={Status}/>
                    <Route exact path={routes.TEST} component={Test}/>
                    <Route exact path={routes.WARDTRANS} component={WardTrans}/>
                    <Route exact path={routes.COMPLETEREPORT} component={CompleteReport}/>
                    <Route exact path={routes.ADDPATEINT} component={AddPatient}/>

                    {/* website */}
                    <Route exact path={routes.HOMEPAGE} component={HomePage} />
                    <Route exact path={routes.GUIDELINE} component={Guideline} />
                    <Route exact path={routes.WEBNEWS} component={WebNews} />
                    <Route exact path={routes.VACCINEPROGRAM} component={VaccineProgram} />

                    <PrivateRoute exact path={routes.PROTECTED} component={PlaceholderForProtectedRoute} AuthorizedUserRoles={[roles.HOSPITAL_ADMIN]} />
                    <Route component={NotFound} />
                </Switch>
            </ProvideAuth>
        </Suspense>
    );
};

export default Router;