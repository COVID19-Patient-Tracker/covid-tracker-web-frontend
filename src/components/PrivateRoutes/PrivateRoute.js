import { postRequest } from '../../api/utils';
import { Redirect, Route } from "react-router-dom";
import * as routes from "../../shared/routes";
import * as backendroutes from "../../shared/BackendRoutes";
import Forbidden from "../../pages/InfoPages/Forbidden";
import React, {useState,useEffect} from 'react'



import { Box, LinearProgress } from "@material-ui/core";
export const PrivateRoute = ({component : Component, ...rest}) => {
    
    const JWTtoken = localStorage.getItem('CPT-jwt-token') // get stored jwt token stored when previous login
    const [validated, setValidated] = useState(null)        // validate stored jwt for valid routing
    const currentUser = JSON.parse(localStorage.getItem(`CPT-user-details`)); // get stored user data when previous login
    const { AuthorizedUserRoles } = rest; // get which roles has access to this private route
    const headers = {headers:{"Authorization": `${JWTtoken}`}}

    useEffect(() => { 
        postRequest(backendroutes.VALIDATETOKEN,null,headers)
            .then((response) => {
                const authorities = response.data.authorities; // get authorities from validated token response
                if(currentUser){
                    const currentUserRole = currentUser.role;
                    setValidated(false)
                    authorities.forEach(auth => {
                        if(auth.authority === `ROLE_${currentUserRole}`){
                            setValidated(true) // compare with stored user role for forged data and set validated true
                            return;
                        }
                    });
                }
            }).catch(e => {
                setValidated(false)
            })
    }, [])

    if(currentUser){
        const currentUserRole = currentUser.role;
        if(AuthorizedUserRoles.includes(currentUserRole)){
            if(validated === null){
                return <Box sx={{ width:"100%" }}> <LinearProgress color='primary'/> </Box>
            }
            return (
                <Route {...rest} render={(props) => {return validated ? <Component {...props} /> : <Forbidden to={routes.LOGIN} />}}/>
            )
        }
    }
    return (
        <Route {...rest} render={(props) => {return currentUser  ? <Forbidden /> :  <Redirect to={routes.LOGIN} />}}/> // double checking mechanism
    )
  }