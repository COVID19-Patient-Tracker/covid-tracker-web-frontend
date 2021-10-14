import { useState } from 'react';
import '../../../../components/css/forms.css';

const CurrentStatus =() =>{
    const [status, setstatus] = useState('');
    
    return (
        <div style={{ margin:'0px 20px'}}>
            <h2>Record patient's current status</h2>
            <form>
                <label>Current status:</label>
                <select
                    value={status}
                    onChange = {(e) => setstatus(e.target.value)}>
                    <option value="select">--Select--</option>
                    <option value="active">Active</option> 
                    <option value="recovered">Recovered</option>
                    <option value="death">Death</option>
                </select>
                <button style={{width:"200px",height:"35px", marginTop:"10px", alignSelf:"center", justifyContent:"center"}}>Save</button>

                <hr className="hr" />
            </form>
        </div>
    );
}



export default CurrentStatus;