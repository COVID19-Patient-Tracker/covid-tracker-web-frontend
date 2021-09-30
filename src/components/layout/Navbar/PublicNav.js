import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Toolbar } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { NavLink, NavMenu ,Nav, NavBtn, NavBtnLink} from '../../Navigation/NavebarElement';
import logo from '../../img/logo7.png'
import {Navbars} from '../../Navigation/Navbar';
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

export default function PublicNav() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <Nav >
                <Toolbar className={classes.toolbar}>
                    <img src={logo} alt="" style={{width:'10rem'}}/>
                    <NavMenu  >
                        <NavLink to="/public/home" style={{marginLeft:'18rem'}}>
                            COVID-STAT
                        </NavLink>
                        <NavLink to="/public/guideline" >
                            GUIDELINE
                        </NavLink>
                        <NavLink to="/public/vaccine-program">
                            VACCINATION
                        </NavLink>
                        <NavLink to="/public/news">
                            NEWS
                        </NavLink>
                    </NavMenu>
                    {/* <NavBtn style={{marginLeft:'10px'}} >
                        <NavBtnLink to='/signup'>SIGN UP</NavBtnLink>
                    </NavBtn> */}
                    <NavBtn style={{marginLeft:'40px'}}>
                        <NavBtnLink to='/login'>LOGIN</NavBtnLink>
                    </NavBtn>
                    
                    <Navbars/>
                </Toolbar>
            </Nav>
        </React.Fragment>
    );
}
