import { makeStyles } from '@material-ui/core';


import React, {useState} from 'react'
// reusable form
export default function useForm(initialFieldValues) {

    const [values, setValues] = useState(initialFieldValues);
    
    const handleInputChange = e => {
        const {name, value} = e.target;
        console.log(name)
        setValues({
            ...values,
            [name] : value
        })
    }

    return {
        values,
        setValues,
        handleInputChange
    }
}

const useStyle = makeStyles(theme => ({

    root:{
        '& .MuiFormControl-root':{
            margin:theme.spacing(1)
        }
    }

}))

export  function Form(props) {
    const classes = useStyle();
    return (
       <form className={classes.root}>
           {props.children}
       </form>
    )
}
