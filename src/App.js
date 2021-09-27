import React from 'react';
import Router from './components/Router';
import Footer from './components/layout/Footer';
import { makeStyles } from "@material-ui/core";

/**
 * Layout Styles
 */
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default
    },
    header: {
        marginBottom: '10px'
    },
    component: {
        flexGrow: 1
    },
}));

const App = () => {
    const classes = useStyles()

    return (
        <React.Fragment>
            <div className={classes.root}>
                <div className={classes.component}>
                    <Router />
                </div>
                <Footer />
            </div>
        </React.Fragment>
    );
}

export default App;
