import { BASE_URL } from "./config"


export const HOSPITAL_ADMIN_ADD_USER_URL = BASE_URL + "/management/api/V1/hospital/admin/user/add" // add hos admin and hos user by hospital user
export const HOSPITAL_USER_ADD_PATIENT = BASE_URL +"/management/api/V1/hospital/user/patient/add" // add patient by hospital user


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

export const GET_ALL_PATIENTS_URL = BASE_URL + "/management/api/V1/hospital/user/patients/all"
export const GET_PATIENT_BY_ID = BASE_URL + "/management/api/V1/hospital/user/getPatientDetails/" // should add id of the user
export const GET_PATIENT_BY_HOSPITAL_ID = BASE_URL + "/management/api/V1/hospital/user/getPatientByhosID/" // should add hospital id of the user
export const GET_WARDS_BY_HOSPITAL_ID = BASE_URL + "/management/api/V1/hospital/user/hospital/wards/" // should add hospital id of the user
export const ADD_WARD_TRANSFER = BASE_URL + "/management/api/V1/hospital/user/hospital/updateHistoryRecord/data" 
export const GET_HOSPITAL_INFO_BY_HOSPITAL_ID = BASE_URL + "/management/api/V1/hospital/admin/getHospitalDetails/" // should add id of the user
export const ADD_PCR_TEST = BASE_URL + "/management/api/V1/hospital/user/pcr/add" 
export const ADD_ANTIGEN_TEST = BASE_URL + "/management/api/V1/hospital/user/antigen/add" 
export const GET_ANTIGEN_TEST = BASE_URL + "/management/api/V1/visitor/antigen/" // should add id of the user
export const UPDATE_ANTIGEN_TEST = BASE_URL + "/management/api/V1/hospital/user/antigen/edit/" // should add id of the user
export const UPDATE_PATIENT_DETAILS = BASE_URL + "/management/api/V1/hospital/user/hospital/updatePatientDetails" // should add id of the user

//hospital Admin
export const UPDATE_HOSPITAL_INFO = BASE_URL + "/management/api/V1/hospital/admin/hospital/updateDetials" 
export const DELETE_HOSPITAL_USERS_BY_ID = BASE_URL + "/management/api/V1/hospital/admin/delete/"
export const ADD_HOSPITAL_USERS = BASE_URL + "/management/api/V1/hospital/admin/user/add"
export const GET_USER_BY_NIC = BASE_URL + "/management/api/V1/hospital/admin/user"
export const GET_ALL_HOSPITAL_USERS_BY_ROLE = BASE_URL + "/management/api/V1/hospital/admin/user"

