//general
export const LANDING = "/";
export const LOGIN = "/login";

//public site
export const PUBLIC = "/public"
export const HOMEPAGE = "/public/home"
export const GUIDELINE = "/public/guideline"
export const WEBNEWS = "/public/news"
export const VACCINEPROGRAM = "/public/vaccine-program"

//moh-admin
//moh-user
export const MOHUSERMANAGEMENT = "/moh/user/user-management"
export const MOHDASH = "/moh/user/dashboard"

//hospital-admin
export const HOSDASH = "/hospital/admin/dashboard" // ha
export const HOSPITALUSERMANAGEMENT = "/hospital/admin/user-management"

//hospital-user
export const HOSUSERDASH = "/hospital/user/dashboard" // hu
export const XRAY = "/hospital/user/upload-xray"
export const REPODASH = "/hospital/user/reportDashboard"
export const ADMITREPO = "/hospital/user/admitReport"
export const HOSPITALTRANS = "/hospital/user/hospitalTransfer"
export const STATUS = "/hospital/user/currentStatus"
export const TEST = "/hospital/user/testResult"
export const WARDTRANS = "/hospital/user/wardTransfer"
export const REPO = "/hospital/user/checkReport"
export const REPOSTATUS = "/hospital/user/checkStatus"
export const REPOHOS = "/hospital/user/checkHospital"
export const REPOWARD = "/hospital/user/checkWard"
export const REPOTEST = "/hospital/user/checkResult"
export const COMPLETEREPORT = "/hospital/user/completeReport"
export const ADDPATEINT = "/hospital/user/addPatient"

// token validation
export const VALIDATETOKEN = "/validate/token/jwt"

export const PROTECTED = "/protected" // for testing
//define the route url here and use it. Easy to change later