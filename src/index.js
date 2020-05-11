import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './assets/css/bootstrap.min.css'
import MainReducer from './reducers/MainReducer.js'
import VisualizeReducer from './reducers/VisualizeReducer.js'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk';
require('dotenv').config()
console.log(process.env)

if(typeof process.env.REACT_APP_API_HOST === 'undefined'){
    console.warn('process.env.REACT_APP_API_HOST undefined')
}

let rootReducer = combineReducers({MainReducer,VisualizeReducer})
const store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
