import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { NavLink, NavMenu ,Nav} from '../../Navigation/NavebarElement';
import logo from '../../img/logo7.png'
import AccountMenu from './Avatar';

import {NavbarsHospitalAdmin} from '../../Navigation/Navbar';


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
                        <NavLink to="/hospital/admin/dashboard" style={{marginLeft:'30rem'}}>
                            DASHBOARD
                        </NavLink>
                        <NavLink to="/hospital/admin/user-management" style={{marginLeft:'-4rem'}}>
                            USER MANAGEMENT
                        </NavLink>
                        <NavLink to="/hospital/admin/hospital-profile" style={{marginLeft:'-4rem'}}>
                            HOSPITAL PROFILE
                        </NavLink>
                    </NavMenu>
                    <AccountMenu/>
                    <NavbarsHospitalAdmin/>
                </Toolbar>
            </Nav>
        </React.Fragment>
    );
}
