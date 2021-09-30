import "react-datepicker/dist/react-datepicker.css";
import '../../../../components/css/forms.css';
import TestResult from './pcr_antigen';
import {Card } from '@material-ui/core';

const Create =() =>{
    return (
        <div className="create" style={{ margin:"150px auto"}}>
            <Card variant="outlined" >
                <TestResult/>
            </Card>
        </div>
    );
}



export default Create;