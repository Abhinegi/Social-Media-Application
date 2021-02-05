import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App/App';
import {BrowserRouter} from 'react-router-dom';
import'bootstrap/dist/css/bootstrap.min.css';
import'bootstrap/dist/js/bootstrap.bundle.min';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import Reducer from  './Reducer/reducer'
import Axios from 'axios';
import thunkMiddleware from 'redux-thunk';


const logger= store =>{
  return next=>{
     return action=>{
       console.log("action is ",action);
       console.log("next is ",next);
       let result=next(action)
       console.log("result ",result);
     }
  }
}
const store=createStore(Reducer,applyMiddleware(logger,thunkMiddleware));

Axios.interceptors.request.use((config)=>{
  config.headers.Authorization = 'Bearer ' + localStorage.getItem('socialmediaToken');
  console.log("Interceprot: " ,config);
  return config;
});




ReactDOM.render(
 <BrowserRouter><Provider store={store}> <App /> </Provider></BrowserRouter>,
  document.getElementById('root')
);

