import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import store from './store'
import { Provider } from 'react-redux'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
const unsubscribe = store.subscribe(() =>{
    // each time store updated save it to the local storage
    localStorage.setItem(`todos`,JSON.stringify(store.getState().todos));
    console.log('State after dispatch: ', store.getState());
  }
)

// get online stauts and update redux state
var online = navigator.onLine;
store.dispatch({ type: 'onlineStatus', payload: online })

// add event listner to offline online modes
window.addEventListener('offline', function(e) {
  online = navigator.onLine;
  store.dispatch({ type: 'onlineStatus', payload: online })
});

window.addEventListener('online', function(e) { 
  online = navigator.onLine;
  store.dispatch({ type: 'todos/todoAdded', payload: online })
});


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
