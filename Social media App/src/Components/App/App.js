import React, {Component} from 'react';
import Home from '../Home/Home';
import Sidebar from '../Sidebar/Sidebar'
import './App.css'
 
export default class App extends Component
{
    
    render(){
    return (
        <>
         <div className="split left">
             <Sidebar/>
         </div>

        <div className="split right">
            <Home></Home>
        </div>
        </>);
}
}