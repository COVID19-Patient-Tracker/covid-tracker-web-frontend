import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { NavLink, NavMenu ,Nav} from '../../Navigation/NavebarElement';
import logo from '../../img/logo7.png'
import {NavbarsMOHAdmin} from '../../Navigation/Navbar';
import AccountMenu from './Avatar';
const useStyles = makeStyles((theme) => ({
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        backgroundColor: "#A9CDEF",
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
    },
    avat: {
        backgroundColor: "#000"
    }
}));

export default function MohUserNav() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <Nav >
                <Toolbar className={classes.toolbar}>
                    <img src={logo} alt="" style={{width:'10rem'}}/>
                    <NavMenu  >
                        <NavLink to="/moh/admin/dashboard" style={{marginLeft:'43rem'}}>
                            DASHBOARD
                        </NavLink>
                        <NavLink to="/moh/admin/user-management" style={{marginLeft:'-4rem'}}>
                            USER MANAGEMENT
                        </NavLink>
                        <AccountMenu/>
                    </NavMenu>
                    
                    <NavbarsMOHAdmin/>
                </Toolbar>
            </Nav>
        </React.Fragment>
        
    );
}
