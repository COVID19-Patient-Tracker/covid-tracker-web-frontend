import { BASE_URL } from "./config"

export const MOH_ADD_USER_URL = BASE_URL + "/management/api/V1/MOH/admin/user/add" // add hos admin and hos user by moh user
export const HOSPITAL_ADMIN_ADD_USER_URL = BASE_URL + "management/api/V1/hospital/admin/user/add" // add hos admin and hos user by hospital user
export const HOSPITAL_USER_ADD_PATIENT = BASE_URL +"management/api/V1/hospital/user/patient/add" // add patient by hospital user


export const LOGIN = BASE_URL + "/login" // login route




// get user details of hospital admin and user
export const GETHOSPITALUSERDETAILS = BASE_URL + "/management/api/V1/hospital/user/getDetails/" // should add id of the user

// token validation
export const VALIDATETOKEN = BASE_URL + "/validate/token/jwt"

export const HOS_ADD_USER_URL = BASE_URL + "/management/api/V1/MOH/user/user/add"

export const GET_ALL_HOSPITALS_URL = BASE_URL + "/management/api/V1/hospital/user/hospitals/all"
