import { BASE_URL } from "./config"

export const MOH_ADD_USER_URL = BASE_URL + "/management/api/V1/MOH/admin/user/add" // add hos admin and hos user by moh user




export const LOGIN = BASE_URL + "/login" // login route




// get user details of hospital admin and user
export const GETHOSPITALUSERDETAILS = BASE_URL + "/management/api/V1/hospital/user/getDetails/" // should add id of the user

// token validation
export const VALIDATETOKEN = BASE_URL + "/validate/token/jwt"

export const HOS_ADD_USER_URL = BASE_URL + "/management/api/V1/MOH/user/user/add"

export const GET_ALL_HOSPITALS_URL = BASE_URL + "/management/api/V1/hospital/user/hospitals/all"
export const DELETE_USERS_BY_ID = BASE_URL + "/management/api/V1/MOH/user/delete/" // should add id
export const GET_ALL_USERS_BY_ROLE = BASE_URL + "/app/V1/user/get/users/" // should add role
