import React, {useContext,useState,useEffect } from 'react'

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

function useProvideAuth(){
    
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        // sessionStorage.setItem("storeduser",null);
        console.log("user set to null in session stotrage by AuthContext()",sessionStorage.getItem("storeduser"))
        
    }, [])

    async function login(email,password){
        await setCurrentUser("user");
        console.log("user set in session stotrage by AuthContext() login function(state variable",currentUser)
        sessionStorage.setItem("storeduser","user");
        console.log("authe context set user , and user name is(session storage item)",sessionStorage.getItem("storeduser"))
        return currentUser;
    }

    async function logout(email,password){
        setCurrentUser(null)
        sessionStorage.setItem("currentUser",null);
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