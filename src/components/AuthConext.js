import React, {useContext,useState,useEffect } from 'react'
import { postRequest } from '../api/utils';
import {BASE_URL} from '../shared/config'
import * as routes from '../shared/routes'
const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

function useProvideAuth(){
    
    const [currentUser, setCurrentUser] = useState(null);
    const [error,setError] = useState(null)
    
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
                    setError(null)
                }
                else if(response.error){
                    const {error,headers} = response
                    setError(error.response.data.exception)
                }
            })
            .catch((e) => {
                console.log(e)
                setError(e)
            });

        return {currentUser,error};
    }

    async function logout(email,password){
        localStorage.removeItem(`CPT-jwt-token`);
        localStorage.removeItem(`CPT-user-details`);
        setCurrentUser(null)
    }

    return {
        login,
        logout,
        error,
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