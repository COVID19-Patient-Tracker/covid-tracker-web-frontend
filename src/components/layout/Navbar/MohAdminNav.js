import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import CssBaseline from '@material-ui/core/CssBaseline';

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

export default function MohAdminNav() {
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
                            DASHBOARD
                        </Link>
                        <Link variant="button" color="textPrimary" href="#" className={classes.link}>
                            USER MANAGEMENT
                        </Link>
                    </nav>
                    {/* <Button href="#" color="primary" variant="contained" className={classes.link}>
                        Login
                    </Button> */}
                    <Avatar className={classes.avat} variant="circular" src="/broken-image.jpg" />
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}
