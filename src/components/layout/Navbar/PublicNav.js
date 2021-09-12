import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Fab, AppBar, Button, Toolbar, Typography, Link } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

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
    }
}));

export default function PublicNav() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                        COVID-SAFE
                    </Typography>
                    <nav className={classes.navStyle}>
                        <Link variant="button" color="textPrimary" href="#" className={classes.link}>
                            COVID-STAT
                        </Link>
                        <Link variant="button" color="textPrimary" href="#" className={classes.link}>
                            GUIDELINE
                        </Link>
                        <Link variant="button" color="textPrimary" href="#" className={classes.link}>
                            VACCINATION
                        </Link>
                        <Link variant="button" color="textPrimary" href="#" className={classes.link}>
                            NEWS
                        </Link>
                    </nav>
                    <Button
                        href="/signup"
                        variant="contained"
                        color="secondary"
                        className={classes.link}
                        startIcon={<PersonAddIcon />}
                    >
                        SIGN UP
                    </Button>
                    <Fab color="secondary" aria-label="add" size="small" href="/login">
                        <ExitToAppIcon />
                    </Fab>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}
