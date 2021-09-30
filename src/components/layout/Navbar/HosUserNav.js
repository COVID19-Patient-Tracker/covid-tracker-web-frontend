import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { NavLink, NavMenu ,Nav} from '../../Navigation/NavebarElement';
import logo from '../../img/logo7.png'
import {NavbarsHospitalUser} from '../../Navigation/Navbar';
import AccountMenu from './Avatar';

const useStyles = makeStyles((theme) => ({
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        backgroundColor: "#FFFFFF00",
    },
    toolbar: { 
        flexWrap: 'wrap',
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    link: {
        margin: theme.spacing(1, 1.5),
    },
    navStyle: {
        fontStyle: "bold",
    }
}));

export default function HosUserNav() {
    const classes = useStyles();
    
    return (
        <React.Fragment>
            <CssBaseline />
            <Nav >
                <Toolbar className={classes.toolbar}>
                    <img src={logo} alt="" style={{width:'10rem'}}/>
                    <NavMenu  >
                        <NavLink to="/hospital/user/dashboard" style={{marginLeft:'10rem'}}>
                            DASHBOARD
                        </NavLink>
                        <NavLink to="/hospital/user/addPatient" style={{marginLeft:'-4rem'}}>
                            ADD PATIENT
                        </NavLink>
                        <NavLink to="/hospital/user/searchpatient" style={{marginLeft:'-4rem'}}>
                            SEARCH PATIENT
                        </NavLink>
                        <NavLink to="/hospital/user/reportDashboard" style={{marginLeft:'-4rem'}}>
                            PATEINT REPORT MANAGEMENT
                        </NavLink>
                        <NavLink to="/hospital/user/upload-xray" style={{marginLeft:'-4rem'}}>
                            UPLOAD X-RAY
                        </NavLink>
                        <AccountMenu/>
                        
                    </NavMenu>
                    
                    <NavbarsHospitalUser/>
                </Toolbar>
            </Nav>
        </React.Fragment>
    );
}
