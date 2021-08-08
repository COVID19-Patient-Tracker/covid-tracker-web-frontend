import { makeStyles, TextField } from '@material-ui/core'
import React from 'react'

const useStyle = makeStyles(theme => ({
    root:{
        "& .MuiInputBase-root MuiOutlinedInput-root":{
            width:"80%"
        }
    }
}))

export default function Input(props) {
    const classes = useStyle();
    const {name, label, value, onChange} = props
    return (
        <TextField className={classes.root} variant="outlined" label={label} name={name} value={value} onChange = {onChange} autoComplete="off" />        
    )
}
