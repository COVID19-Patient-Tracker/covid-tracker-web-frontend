

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Toolbar } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import { NavLink, NavMenu ,Nav, NavBtn, NavBtnLink} from '../../Navigation/NavebarElement';
import logo from '../../img/logo7.png'
import Navbars from '../../Navigation/Navbar';
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
                        <NavLink to="/hospital/user/addPatient" style={{marginLeft:'-3rem'}}>
                            ADD PATIENT
                        </NavLink>
                        <NavLink to="/hospital/user/searchpatient" style={{marginLeft:'-3rem'}}>
                            SEARCH PATIENT
                        </NavLink>
                        <NavLink to="/hospital/user/reportDashboard" style={{marginLeft:'-3rem'}}>
                            PATEINT REPORT MANAGEMENT
                        </NavLink>
                        <NavLink to="/hospital/user/upload-xray" style={{marginLeft:'-3rem'}}>
                            UPLOAD X-RAY
                        </NavLink>
                        <Avatar className={classes.avat} variant="circular" src="/broken-image.jpg"  style={{marginLeft:'30px'}}/>
                    </NavMenu>
                    
                    <Navbars/>
                </Toolbar>
            </Nav>
        </React.Fragment>
    );
}
