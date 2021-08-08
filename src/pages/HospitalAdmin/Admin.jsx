import { makeStyles, Paper } from '@material-ui/core';
import React from 'react'
import AdminForm from './AddAdminForm'

const useStyle = makeStyles(theme => ({
    pageContent:{
        margin:theme.spacing(5),
        padding:theme.spacing(3),
    }
}))

export default function Admin() {
    const classes = useStyle();
    return (
        <React.Fragment>
            {/* add page header */}
            <Paper className={classes.pageContent} elavation={3}>
               <AdminForm />
            </Paper>
        </React.Fragment>
    )
}
