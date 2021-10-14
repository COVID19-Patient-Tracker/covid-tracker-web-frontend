import React from 'react';

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
    },
}));

export default function HospitalProfile() {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            
        </div>
    )
}

