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
            .then(({headers, data, error}) => {

                console.log(headers.authorization)

                if(data){
                    setCurrentUser(data)
                    localStorage.setItem(`CPT-jwt-token`,headers.authorization);
                    localStorage.setItem(`CPT-user-details`,JSON.stringify(data));
                }
                else if(error){
                    console.log(error)
                    // TODO: handle errors
                }

            })
            .catch((e) => {

                console.log(e)
                // TODO: handle errors
                
            });

        return currentUser;
    }

    async function logout(email,password){
        localStorage.removeItem(`CPT-jwt-token`);
        localStorage.removeItem(`CPT-user-details`);
        setCurrentUser(null)
    }

    return {
        login,
        logout,
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