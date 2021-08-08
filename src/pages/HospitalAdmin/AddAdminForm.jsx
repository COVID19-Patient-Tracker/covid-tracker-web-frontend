import { Grid  } from '@material-ui/core';
import React from 'react'
import Button from '../../components/controls/Button';
import Controls from '../../components/controls/controls';
import useForm, { Form } from '../../components/useForm';

const initalFieldValues = {
    firstName:'',
    lastName:'',
    email:'',
    NIC:'',
    phone:'',
    userType:''
}

const userTypeItems = [
    {id:"HOSPITAL_ADMIN",label:"ADMIN"},
    {id:"HOSPITAL_USER",label:"USER"},
]

export default function AddAdminForm() {
    
    const {
        values,
        setValues,
        handleInputChange
    } = useForm(initalFieldValues)

    return (
        <Form>
            <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={8}>
                    <Controls.Input name="lastName" label="Last Name" value={values.lastName} onChange={handleInputChange} />
                    <Controls.Input name="firstName" label="First Name" value={values.firstName} onChange={handleInputChange} />
                    <Controls.Input label="Email" name="email" value={values.email} onChange = {handleInputChange} />
                    <Controls.Input label="NIC" name="NIC" value={values.NIC} onChange = {handleInputChange} />
                    <Controls.Input label="Phone" name="phone" value={values.phone} oncChange = {handleInputChange}/>
                    <Controls.RadioGroup items={userTypeItems} name="userType" label="User Type" onChange ={handleInputChange} value={values.userType}/>
                    <Controls.Button variant="contained" color="primary" text="Submit" onClick={()=>console.log(values)}/>
                </Grid>
            </Grid>
        </Form>
    )
    
}