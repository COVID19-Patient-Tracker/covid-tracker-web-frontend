import React, { useEffect, useState } from 'react';
import Router from './components/Router';

import Footer from './components/layout/Footer';





import store from './store'
import { makeStyles } from "@material-ui/core";



import InfoBox from "./components/InfoBox/InfoBox"
import { SendSpecifiedRequest } from "./api/utils"

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
    const [syncing,setSyncing] = useState(false);
    var [count,setCount] = useState(0);
    const classes = useStyles()
    let globalState = store.getState();
    const todos = globalState.todos // todos is a array with objects

    // when loading the app if there is todos to sync -> sync
    useEffect(() => {
            let globalState = store.getState();
            const online = globalState.onlineStatus;
            const todos = globalState.todos 
            // set online status
            if(online && todos.length > 0){
                setSyncing(true)
                sendReqs(todos)
            }
        // subscribe for change of react redux store
        const unsubscribe = store.subscribe(() =>{
            // global states that saved in store
            let globalState = store.getState();
            const online = globalState.onlineStatus;
            const todos = globalState.todos 
            // set online status
            if(online && todos.length > 0){
                setSyncing(true)
                sendReqs(todos)
            }
        });
        return () => {
            // unsubscribe for the store change event - otherwies it will create a loop
            unsubscribe();
        }
    }, [])
    

    // todos are set only when user has logged in, so requests in todos, synced when user has 
    // authorized
    
    // for UX simulate network latency
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      
    const sendReqs = async (todos) => {

        for (let index = 0; index < todos.length; index++) {

            const todo = todos[index];
            setCount(count = count + 99/99); 
            SendSpecifiedRequest(todo.data.url,todo.data.inputs,todo.data.headers,todo.data.method)
                .then((response) => {
                    const {data,error} = response
                    // TODO : error handling
                    console.log(data,error)
                }); // sending req

            await sleep(2000) // for UX
        }

        if(count === todos.length) {
            setSyncing(false)
            setCount(count = 0)
            store.dispatch({type:"todos/reset"})
        }
    }
    
    return (
        <React.Fragment>
            <div className={classes.root}>
                <div className={classes.component}>
                    {syncing ? <InfoBox props={{infoMessage: "Synchronizing "+count+"/"+todos.length,progress:true}} /> : null}
                    <Router />
                </div>
                <Footer />
            </div>
        </React.Fragment>
    );
}

export default App;
