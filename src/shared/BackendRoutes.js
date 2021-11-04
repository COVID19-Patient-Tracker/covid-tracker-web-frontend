import { BASE_URL } from "./config"


export const MOH_ADD_USER_URL = BASE_URL + "/management/api/V1/MOH/admin/user/add" // add hos admin and hos user by moh user
export const LOGIN = BASE_URL + "/login" // login route
export const GETHOSPITALUSERDETAILS = BASE_URL + "/management/api/V1/hospital/user/getDetails/" // should add id of the user
export const VALIDATETOKEN = BASE_URL + "/validate/token/jwt"
export const HOS_ADD_USER_URL = BASE_URL + "/management/api/V1/MOH/user/user/add"
export const ADD_HOSPITAL = BASE_URL + "/management/api/V1/MOH/user/hospital/add"
export const GET_ALL_HOSPITALS_URL = BASE_URL + "/management/api/V1/hospital/user/hospitals/all"
export const DELETE_USERS_BY_ID = BASE_URL + "/management/api/V1/MOH/user/delete/" // should add id
export const GET_ALL_USERS_BY_ROLE = BASE_URL + "/app/V1/user/get/users/" // should add role
export const GET_STATISTICS = BASE_URL + "/management/api/V1/statistics/all/" // should add role
export const DELETE_HOSPITAL = BASE_URL + "/management/api/V1/MOH/user/hospital/delete/"
export const DELETE_MOH_USERS_BY_ID = BASE_URL + "/management/api/V1/MOH/admin/delete/"

export const ADD_HOSPITAL_USERS = BASE_URL + "/management/api/V1/hospital/admin/user/add"
export const GET_USER_BY_NIC = BASE_URL + "/management/api/V1/hospital/admin/user"