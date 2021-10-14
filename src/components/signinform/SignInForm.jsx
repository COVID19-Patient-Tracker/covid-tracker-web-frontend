import React,{useEffect, useState} from 'react'
import "../css/AuthForms.css"
import * as routes from "../../shared/routes";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../AuthConext'

function SignInForm(){
    const [email,setUserName] = useState('');
    const [password,setPassword] = useState('');
    const [isValidLogin,setIsValidLogin] = useState(null);
    const auth = useAuth()
    const history = useHistory()

    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        // when click away set exception  to null
      if (reason === 'clickaway') {
        auth.setException(null);
        return;
      }
      // when exception is closed set exceptions to null
      auth.setException(null);
      setOpen(false);
      setIsValidLogin(null);
    };

    // setting value email
    const handleEmailInput = event => {
        setUserName(event.target.value)
    }
    // setting value password
    const handlepasswordInput = event => {
        setPassword(event.target.value)
    }
    const  signin = async e => {
        e.preventDefault();
        auth.login(email,password);
    }

    useEffect(() => {
        
        var u = auth.currentUser;
        var e = auth.exception;
        console.log(e)
        if(e){
            // if any exception, it is a invalid login and show the exception message
            setIsValidLogin(e);
            setOpen(true)
        }
        else{
            setIsValidLogin(null)
            setOpen(false)
        }

        // TODO : authorize JWT token before user logged in - done
        if(u && !e){
            if(u.role === "MOH_ADMIN"){
                history.push(routes.MOHDASH); 
            }
            else if(u.role === "MOH_USER"){
                history.push(routes.MOHDASH); 
                // TODO : send to MOH_USER dashboard
            }
            else if(u.role === "HOSPITAL_USER"){
                history.push(routes.HOSUSERDASH);
                // TODO : send to HOSPITAL_USER dasjhboard
            }
            else if(u.role === "HOSPITAL_ADMIN"){
                history.push(routes.HOSUSERDASH);
                // TODO : send to HOSPITAL_ADMIN dashboard
            }
            else if(u.role === "PATIENT"){
                history.push(routes.PROTECTED);
                // TODO : send to PATIENT dashboard
            }
            else if(u.role === "MOH_ADMIN"){
                history.push(routes.PROTECTED);
                // TODO : send to MOH_ADMIN dashboard
            }
        }
        return () => {
        }

    }, [auth.currentUser,auth.exception,history])
    
    
    return(
        <div className="form__wrapper">
            <div className="left__box">
                <img src="/assets/loginback1.svg" alt="login_vector" className="left_color_back"></img>
                <img src="/assets/login_left.png" alt="login_vector" className="left_image"></img>
            </div>
            <div className="right_box">
                <img src="/assets/profile1.png" alt="login_vector" className="profile_image"></img>
                 <h1 className="login__banner">LOGIN</h1>
                 <form className="form">
                    <input value={email} type="text" id="email" name="email" placeholder="EMAIL" onChange={handleEmailInput} />
                    <input type="password" id="password" name="password" placeholder="PASSWORD" onChange={handlepasswordInput} />
                    <div className="remember-me">
                        <input type="checkbox" id="remember-me" name="remember-me" value="remember-me"></input>
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                            {isValidLogin}
                        </Alert>
                    </Snackbar>
                    <input type="submit" value="Login" onClick={signin}></input>
                </form>
            </div>
        </div>
    )
}

export default SignInForm