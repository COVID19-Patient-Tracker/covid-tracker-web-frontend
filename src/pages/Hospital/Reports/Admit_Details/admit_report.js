import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import {MuiPickersUtilsProvider,KeyboardDatePicker} from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import "react-datepicker/dist/react-datepicker.css";
import "../../../../components/css/forms.css"
import { getRequest } from "../../../../api/utils";
import * as routes from '../../../../shared/BackendRoutes';
import {useParams} from 'react-router-dom'

const AdmitRepo =() =>{
    
    const {id} = useParams()
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

    // // get all hospitals
    // useEffect(() => {
    //     getRequest(routes.GET_ALL_HOSPITALS_URL,headers)
    //         .then((response => {
    //             if(response.data) {
    //                 setErrors({})
    //                 setHospitals(response.data.hospitals);
    //             }
    //             if(response.error) setErrors({...response.error.response.data});
    //         }))
    // }, [])
        
    // get patient by id
  useEffect(() => {
      
   if(isOnline){

        // made request to the backend
        getRequest(routes.GET_PATIENT_BY_ID +id , headers)
            .then((response) => {
                if(response.data){
                    const {data,headers} = response
                    setPatients(data.Info)
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
            {/* {patients.map((row) => (
                    
                ))} */}
            <form >
                
                <label>First name:</label>
                <input 
                    type="text"  
                    required
                    value={patients.first_name}
                    onChange = {(e) => setfName(e.target.value)}/>

                <label>Last name:</label>
                <input 
                    type="text"
                    value={patients.last_name}
                    onChange = {(e) => setlName(e.target.value)}></input>
                <label>Birthday:</label>
                <input 
                    type="date"
                    value={patients.dob}
                    onChange={handleDateChange}></input>
                
                {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        format="dd/MM/yyyy"
                        value={selectedDate}
                        fullWidth
                        required
                        maxDate={new Date()}
                        onChange={handleDateChange}
                    /> 
                </MuiPickersUtilsProvider> */}
             
               <label>Age:</label>
                <input type="number" 
                    min="0" 
                    value={patients.age}
                    required
                    onChange = {(e) => setage(e.target.value)}/>

                <label>NIC:</label>
                <input 
                    type="text"  
                    required
                    value={patients.nic}
                    onChange = {(e) => setNIC(e.target.value)}/>

                <label>Phone number:</label>
                <input 
                    type="text"
                    required
                    value={patients.contact_no}
                    onChange = {(e) => setlphone(e.target.value)}></input>

                <label>Address:</label>
                <input 
                    type="text"
                    required
                    value={patients.address}
                    onChange = {(e) => setaddress(e.target.value)}></input>
                            
                {/* <label>Hospital:</label>
                <select
                    value={patients.hospital_id}
                    onChange = {(e) => setgender(e.target.value)}>
                    <option value="Select"></option> 
                    {Hospitals.map((hospital) => <option value={hospital.hospital_id}>{hospital.name}</option>)}
                </select> */}

                <label>Gender:</label>
                <select
                    value={patients.gender}
                    onChange = {(e) => setgender(e.target.value)}>
                    <option value="Select"></option> 
                    <option value="male">Male</option> 
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>

                <label>Adult or child:</label>
                <select
                    value={patients.is_child}
                    onChange = {(e) => setadultchild(e.target.value)}>
                    <option value="Select"></option> 
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