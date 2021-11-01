import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import {MuiPickersUtilsProvider,KeyboardDatePicker} from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import "react-datepicker/dist/react-datepicker.css";
import "../../../../components/css/forms.css"
import { getRequest } from "../../../../api/utils";
import * as routes from '../../../../shared/BackendRoutes';

const AdmitRepo =() =>{
    const [search, setSearch] = useState('');
    const [isOnline,setIsOnline] = useState(true);
    const [reqSuccess,setReqSuccess] = useState(false);
    const [errors,setErrors] = useState({}); // errors in inputs
    const [open, setOpen] = React.useState(false);
    const [patients, setPatients] = React.useState([]);
    const [syncMessage, setSynceMessage] = React.useState(null);
    const JWTtoken = localStorage.getItem('CPT-jwt-token') // get stored jwt token stored when previous login
    const headers = {headers:{"Authorization": `${JWTtoken}`}} // headers

    //const { data } = props.location
    //console.log(props.location)
    const [fName, setfName] = useState('Nimal');
    const [lName, setlName] = useState('Perera');
    const [nic, setNIC] = useState('987710110V');
    const [phone, setlphone] = useState('0771234417');
    const [address, setaddress] = useState('No. 11, Gampaha');
    const [gender, setgender] = useState('male');    
    const [adultchild, setadultchild] = useState('adult');
    const [age, setage] = useState('23');
    const [selectedDate, setSelectedDate] = useState('01/09/1998');
    const handleDateChange = (date) => {
        console.log(date);
        setSelectedDate(date);
    };

    // get all patients
  useEffect(() => {
       
    if(isOnline){
        // made request to the backend
        getRequest(routes.GET_ALL_PATIENTS_URL, headers)
            .then((response) => {
                if(response.data){
                    const {data,headers} = response
                    setPatients(data.patients)
                    console.log(data.patients)
                    setErrors({});
                    setReqSuccess(true)
                }
                else if(response.error){
                    const {error,headers} = response
                    setErrors({...error.response.data}) // set errors of inputs and show
                    setReqSuccess(false)
                }
            })
            .catch((e) => {
                setReqSuccess(false)
            });

    }else{
        // TODO : show warning method that it will synced with backend when online
        setSynceMessage("you're offline now. changes you make will automatically sync with database");
        setOpen(true)
        
    }
  },[]);
    return (
        <div style={{ margin:'0px 20px'}}>
            <h2>Update admitted patient details</h2>
            <form>
                <label>First name:</label>
                <input 
                    type="text"  
                    required
                    value={fName}
                    onChange = {(e) => setfName(e.target.value)}/>

                <label>Last name:</label>
                <input 
                    type="text"
                    value={lName}
                    onChange = {(e) => setlName(e.target.value)}></input>
                <label>Birthday:</label>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        format="dd/MM/yyyy"
                        value={selectedDate}
                        fullWidth
                        required
                        maxDate={new Date()}
                        onChange={handleDateChange}
                    /> 
                </MuiPickersUtilsProvider>
               <br/>
               <label>Age:</label>
                <input type="number" 
                    min="0" 
                    value={age}
                    required
                    onChange = {(e) => setage(e.target.value)}/>

                <label>NIC:</label>
                <input 
                    type="text"  
                    required
                    value={nic}
                    onChange = {(e) => setNIC(e.target.value)}/>

                <label>Phone number:</label>
                <input 
                    type="text"
                    required
                    value={phone}
                    onChange = {(e) => setlphone(e.target.value)}></input>

                <label>Address:</label>
                <input 
                    type="text"
                    required
                    value={address}
                    onChange = {(e) => setaddress(e.target.value)}></input>

                <label>Gender:</label>
                <select
                    value={gender}
                    onChange = {(e) => setgender(e.target.value)}>
                    <option value="male">Male</option> 
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>

                <label>Adult or child:</label>
                <select
                    value={adultchild}
                    onChange = {(e) => setadultchild(e.target.value)}>
                    <option value="adult">Adult</option> 
                    <option value="child">Child</option>
                </select>
                

                
                <button style={{width:"200px",height:"35px", marginTop:"10px", alignSelf:"center", justifyContent:"center"}}>Update</button>
                <hr className="hr" />
            </form>
        </div>
    );
}



export default AdmitRepo;