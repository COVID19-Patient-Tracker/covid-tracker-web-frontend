import React,{useEffect} from 'react'
import "../css/AuthForms.css"
import image from "./image.png"
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../AuthConext'

function SignInForm(){
    const auth = useAuth()
    const history = useHistory()

    const  signin = async e => {
        e.preventDefault();
        auth.login("email","password")
        // TODO : make a rquest to backend nad get authorized
    }

    useEffect(() => {
        let storedUser = sessionStorage.getItem("storeduser")
        // TODO : authorize JWT token before user logged in
        if(storedUser){
            history.push("/protected");
        }
        return () => {
            console.log("cleanup function in signin form useEffect()");
        }
    }, [auth.currentUser,history])
    
    
    return(
        <div className="form__wrapper">
            <div className="left__box">
                <img src={image} alt="login_vector" style={{
                    size: "500px",
                    height: "421px",
                    left: "88px",
                }}></img>
            </div>
            <div className="right_box">
                 <h1 className="login__banner">LOGIN</h1>
                 <form className="form">
                    <input type="text" id="email" name="email" placeholder="EMAIL"/>
                    <input type="password" id="password" name="password" placeholder="PASSWORD"/>
                    <div className="remember-me">
                        <input type="checkbox" id="remember-me" name="remember-me" value="remember-me"></input>
                        <label for="remember-me">Remember me</label>
                    </div>
                    <input type="submit" value="sign in" onClick={signin}></input>
                    <h4>Sign Up <Link to="/signup">Here</Link></h4>
                </form>
            </div>
        </div>
    )
}

export default SignInForm
