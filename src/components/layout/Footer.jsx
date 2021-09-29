import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Team NovaX
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({

    footer: {
        borderTop: `1px solid ${theme.palette.divider}`,
        backgroundColor: '#7fc9ce',
        //marginTop: theme.spacing(8),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(4),
        },
    },

    dividerStyle: {
        background: "#000",
    }
}));

export default function Footer() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            {/* Footer */}
            <footer className={classes.footer}>
                <Typography variant="h6" align="center" gutterBottom>
                    Get In Touch
                </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p" gutterBottom>
                    Contact us for any technical support
                </Typography>
                <Divider className={classes.dividerStyle} variant="middle" />
                <Copyright />
            </footer>
            {/* End footer */}
        </React.Fragment>
    );
}