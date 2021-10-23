import React, {useContext,useState,useEffect } from 'react'
import { postRequest } from '../api/utils';
import {BASE_URL} from '../shared/config'
import { Link, useHistory } from 'react-router-dom'
import * as routes from '../shared/routes'
const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

function useProvideAuth(){
    
    const [currentUser, setCurrentUser] = useState(null);
    const [exception,setException] = useState(null)
    const history = useHistory();
    
    useEffect(() => {
        if(localStorage.getItem(`CPT-user-details`) && localStorage.getItem(`CPT-jwt-token`)){
            setCurrentUser(JSON.parse(localStorage.getItem(`CPT-user-details`)));
        }
        else{
            setCurrentUser(null);
        }
        
    }, [])

    async function login(email,password){
        const postData = {
            "email":email,
            "password":password
        }
        // made request to the backend
        postRequest(routes.LOGIN,postData)
            .then((response) => {
                if(response.data){
                    const {data,headers} = response
                    setCurrentUser(data)
                    localStorage.setItem(`CPT-jwt-token`,headers.authorization);
                    localStorage.setItem(`CPT-user-details`,JSON.stringify(data));
                    setException(null)
                }
                else if(response.error){
                    const {error,headers} = response
                    console.log(error.response.data.exception)
                    setException(error.response.data.exception)
                }
            })
            .catch((e) => {
                setException(e)
            });

    }

    async function logout(){
        localStorage.removeItem(`CPT-jwt-token`);
        localStorage.removeItem(`CPT-user-details`);
        setCurrentUser(null)
        history.push("/login");
    }

    return {
        login,
        logout,
        setException,
        exception,
        currentUser
      };
}
export function ProvideAuth({children}){
    const auth = useProvideAuth();    
    return (
        <AuthContext.Provider value={auth} >
            {children}
        </AuthContext.Provider>
    )
}