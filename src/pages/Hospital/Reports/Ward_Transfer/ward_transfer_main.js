import "react-datepicker/dist/react-datepicker.css";
import '../../../../components/css/forms.css';
import WardTransfer from './ward _transfer';
import {Card } from '@material-ui/core';

const Create =() =>{
    return (
        <div className="create" style={{ margin:"150px auto"}}>
            <Card variant="outlined" >
                <WardTransfer/>
            </Card>
        </div>
    );
}



export default Create;