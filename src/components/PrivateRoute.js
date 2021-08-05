import { Redirect, Route } from "react-router-dom";
import * as routes from "../shared/routes";


export const PrivateRoute = ({component : Component, ...rest}) => {
    const currentUser = sessionStorage.getItem("storeduser");
    console.log(currentUser)
    return (
        <Route {...rest} render={(props) => {
            return currentUser ? <Component {...props} /> : <Redirect to={routes.LOGIN} />
        }}
        />
  
    )
  }