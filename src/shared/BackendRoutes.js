import { BASE_URL } from "./config"

export const MOH_ADD_USER_URL = BASE_URL + "/management/api/V1/MOH/admin/user/add" // add hos admin and hos user by moh user




export const LOGIN = BASE_URL + "/login" // login route




// get user details of hospital admin and user
export const GETHOSPITALUSERDETAILS = BASE_URL + "/management/api/V1/hospital/user/getDetails/" // should add id of the user

// token validation
export const VALIDATETOKEN = BASE_URL + "/validate/token/jwt"