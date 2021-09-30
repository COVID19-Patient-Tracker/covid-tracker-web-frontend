import { useState } from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "../../../../components/css/forms.css"

const AdmitRepo =() =>{
    const [fName, setfName] = useState('Nimal');
    const [lName, setlName] = useState('Perera');
    const [email, setEmail] = useState('nimal80@gmail.com');
    const [phone, setlphone] = useState('0771234417');
    const [address, setaddress] = useState('No. 11, Gampaha');
    const [gender, setgender] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [age, setage] = useState('');

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
                    required
                    value={lName}
                    onChange = {(e) => setlName(e.target.value)}></input>
               
                <label>Email:</label>
                <input 
                    type="email"
                    required
                    value={email}
                    onChange = {(e) => setEmail(e.target.value)}></input>

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
                    <option value="select">--Select--</option>
                    <option value="male">Male</option> 
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                <label>Birthday:</label>
                <DatePicker selected={startDate} 
                    onChange={(date) => setStartDate(date)}
                    dateFormat= 'dd/MM/yyyy'
                    maxDate= {new Date()}
                    showYearDropdown
                    scrollableYearDropdown />

                <label>Age:</label>
                <input type="number" 
                    min="0" 
                    value={age}
                    onChange = {(e) => setage(e.target.value)}/>
                <button style={{width:"200px",height:"35px", marginTop:"10px", alignSelf:"center", justifyContent:"center"}}>Update</button>
                <hr className="hr" />
            </form>
        </div>
    );
}



export default AdmitRepo;