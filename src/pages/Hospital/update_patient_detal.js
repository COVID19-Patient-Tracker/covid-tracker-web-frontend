import { useState } from 'react';

import "react-datepicker/dist/react-datepicker.css";
import '../../components/css/forms.css'
import AdmitRepo from './Reports/Admit_Details/admit_report';
import CurrentStatus from './Reports/Patient_Status/current_status';
import HospitalTransfer from './Reports/Hospital_Transfer/hospital _transfer';
import TestResult from './Reports/PCR_Antigen_Results/pcr_antigen';
import WardTransfer from './Reports/Ward_Transfer/ward _transfer';


const Create =() =>{
    const [id] = useState('987710110V');

    return (
        <div className="create">
            <input 
                className="input1"
                type="text" 
                required
                value={id}/>
            <AdmitRepo/>
            <TestResult/>
            <CurrentStatus/> 
            <HospitalTransfer/>  
            <WardTransfer/> 
        </div>
    );
}



export default Create;