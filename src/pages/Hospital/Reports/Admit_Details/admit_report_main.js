import "react-datepicker/dist/react-datepicker.css";
import '../../../../components/css/forms.css';
import AdmitRepo from './admit_report';
import {Card } from '@material-ui/core';

const Create =() =>{
    return (
        <div className="create" style={{ margin:"150px auto"}}>
            <Card variant="outlined" >
                <AdmitRepo />
            </Card>
        </div>
    );
}



export default Create;