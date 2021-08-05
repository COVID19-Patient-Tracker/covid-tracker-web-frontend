import {React,useEffect} from 'react'
import "../css/AuthForms.css"
import image from "./image.png"
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../AuthConext'

export const SignUpForm = () => {
    const auth = useAuth();
    const history = useHistory();

    // TODO : register the user into system
    useEffect(() => {
        let storedUser = sessionStorage.getItem("storeduser");
        if(storedUser){
            history.push("/protected");
        }
        return () => {
            console.log("cleaned");
        }
    }, [auth.currentUser])
    
    return (
            <div className="form__wrapper">
            <div className="left__box">
                <img src={image} alt="image" style={{
                    size: "500px",
                    height: "421px",
                }}></img>
            </div>
            <div className="right_box">
                 <h1 className="login__banner">SIGNUP</h1>
                 <form className="form">
                    <input type="text" id="id" name="id" placeholder="ID"/>
                    <input type="text" id="email" name="email" placeholder="EMAIL"/>
                    <input type="password" id="password" name="password" placeholder="PASSWORD"/>
                    <input type="password" id="confirm-password" name="confirm-password" placeholder="CONFIRM PASSWORD"/>
                    <input type="submit" value="sign up" onClick={(e)=>{e.preventDefault(); console.log("sign up clicked")}}></input>
                    <h4 style={{margin:"0px"}}>Sign In <Link to="/login">Here</Link></h4>
                </form>
            </div>
        </div>
    )
}

