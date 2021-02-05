import React, { useState,useEffect } from 'react';
import AddPost from '../AddPost/AddPost'
import './Sidebar.css';
import Profilebar from './Profilebar/Profilebar';
import Axios from 'axios';

const Sidebar= props =>{
    const [addPost,setAddPost]=useState(false);

   function closeAddPostModal(){
        setAddPost(false);
    }

    useEffect(()=>{
        // if(localStorage.getItem('socialmediaToken')===null){
        //     Axios.post('http://localhost:3001/login',{username:'saksa',password:'saksa@123'}).then(
        //         res=>{
        //             console.log("sidebar response: ",res);
        //             if(res.data){
        //                     localStorage.setItem('socialmediaToken',res.data);
        //             }
        //         }
        //     )
        // }
        
        
    })

 return(
     <>
                    <div className="wrapper">
                <nav className="sidebar">
                    <div className="sidebar-header">
                        <h3>Sports Social Media</h3>
                    </div>

                    <ul className="list-unstyled components">
                        <p>Players choice</p>
                        <Profilebar/>
                        <li className="active" onClick={()=>{ setAddPost(true)}}>
                         <h3>  + Add Post </h3>
                        </li>
                    </ul>

                </nav>
                <div id="content">

                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container-fluid">

                            <button type="button" id="sidebarCollapse" className="btn btn-info">
                                <i className="fas fa-align-left"></i>
                                <span>Toggle Sidebar</span>
                            </button>
                        </div>
                    </nav>
                </div>
            </div>

            <>
            {
            addPost? <AddPost closeAddPostModal={closeAddPostModal}></AddPost>:null
            }
            </>
     </>
 );
}

export default Sidebar;