import React from 'react'
import {Button as MuiButton} from '@material-ui/core';

export default function Button(props) {

    const {size,color,varaiant,text, onClick} = props;
    return (
        <MuiButton variant={varaiant} color={color}  size={size} onClick={onClick}>
            {text}
        </MuiButton>
    )
}
