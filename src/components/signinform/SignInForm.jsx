import React,{useEffect, useState} from 'react'
import "../css/AuthForms.css"
import * as routes from "../../shared/routes";
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../AuthConext'

function SignInForm(){
    const [email,setUserName] = useState('');
    const [password,setPassword] = useState('');
    const auth = useAuth()
    const history = useHistory()

    const handleEmailInput = event => {
        setUserName(event.target.value)
    }

    const handlepasswordInput = event => {
        setPassword(event.target.value)
    }
    const  signin = async e => {
        e.preventDefault();
        auth.login(email,password)
        // TODO : make a rquest to backend and get authorized - done
    }

    useEffect(() => {

        var u = auth.currentUser;
        // TODO : authorize JWT token before user logged in - done
        if(u){
            if(u.role === "MOH_ADMIN"){
                history.push(routes.MOHDASH); // not sure about this
            }
            else if(u.role === "MOH_USER"){
                history.push(routes.MOHDASH); // not sure about this
                // TODO : send to MOH_USER dashboard
            }
            else if(u.role === "HOSPITAL_USER"){
                // TODO : send to HOSPITAL_USER dasjhboard
            }
            else if(u.role === "HOSPITAL_ADMIN"){
                // TODO : send to HOSPITAL_ADMIN dashboard
            }
            else if(u.role === "PATIENT"){
                // TODO : send to MOH_ADMIN dashboard
            }
            else if(u.role === "MOH_ADMIN"){
                // TODO : send to MOH_ADMIN dashboard
            }
        }
        return () => {
        }

    }, [auth.currentUser,history])
    
    
    return(
        <div className="form__wrapper">
            <div className="left__box">
                <img src="/assets/image.png" alt="login_vector" style={{
                    size: "500px",
                    height: "641px",
                    left: "88px",
                }}></img>
            </div>
            <div className="right_box">
                 <h1 className="login__banner">LOGIN</h1>
                 <form className="form">
                    <input value={email} type="text" id="email" name="email" placeholder="EMAIL" onChange={handleEmailInput} />
                    <input type="password" id="password" name="password" placeholder="PASSWORD" onChange={handlepasswordInput} />
                    <div className="remember-me">
                        <input type="checkbox" id="remember-me" name="remember-me" value="remember-me"></input>
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <input type="submit" value="sign in" onClick={signin}></input>
                    <h4>Sign Up <Link to="/signup">Here</Link></h4>
                </form>
            </div>
        </div>
    )
}

export default SignInForm
