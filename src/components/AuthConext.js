import React, {useContext,useState,useEffect } from 'react'

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

function useProvideAuth(){
    
    const [currentUser, setCurrentUser] = useState(null);

    async function login(email,password){
        await setCurrentUser(email);
        sessionStorage.setItem("email",email);
        return currentUser;
    }

    async function logout(email,password){
        setCurrentUser(null)
        sessionStorage.setItem("email",null);
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