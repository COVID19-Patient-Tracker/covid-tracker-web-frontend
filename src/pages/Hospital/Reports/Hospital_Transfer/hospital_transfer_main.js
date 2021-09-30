import "react-datepicker/dist/react-datepicker.css";
import '../../../../components/css/forms.css';
import HospitalTransfer from './hospital _transfer';
import {Card } from '@material-ui/core';

const Create =() =>{
    return (
        <div className="create" style={{ margin:"150px auto"}}>
            <Card variant="outlined" >
                <HospitalTransfer/>
            </Card>
        </div>
    );
}



export default Create;