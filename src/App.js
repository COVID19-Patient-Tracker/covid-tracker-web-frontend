import React from 'react';
import Router from './components/Router';
import Footer from './components/layout/Footer';
import { makeStyles } from "@material-ui/core";
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './styles/theme';

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
            <ThemeProvider theme={theme}>
                <div className={classes.root}>
                    <div className={classes.component}>
                        <Router />
                    </div>
                    <Footer />
                </div>
            </ThemeProvider>
        </React.Fragment>
    );
}

export default App;
