import "react-datepicker/dist/react-datepicker.css";
import '../../../../components/css/forms.css';
import CurrentStatus from './current_status';
import {Card } from '@material-ui/core';

const Create =() =>{
    return (
        <div className="create" style={{ margin:"150px auto"}}>
            <Card variant="outlined" >
                <CurrentStatus/>
            </Card>
        </div>
    );
}



export default Create;