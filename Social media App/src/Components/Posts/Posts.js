import React,{useState,useEffect,useCallback} from 'react';
import Post from './Post/Post'
import Axios from 'axios';
import {connect} from 'react-redux';
import {setPostAdded,resetPostAdded} from '../../Actions/Action';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';

const Posts=(props)=>{

        const scrollbot=useCallback(()=>{
            console.log("Alert");
            alert('alert')
        })
    const [posts, setPosts] =useState([]);
    console.log("Posts.js props ",props)

    useEffect(()=>{

        console.log("useeffect called in Posts.js")
        Axios.get('http://localhost:3001/getUserData/Saksa/?page=1').then(
            response=>{
                console.log("res post ",response)
                if(response.data)
                    setPosts(response.data);
                if(props.isPostAdded)
                  props.resetPostAdded();
            }
        )
    },[props.isPostAdded]);
    

    useBottomScrollListener(scrollbot);

 return (
     <div>
       {
        posts.map(item =>{
           return   <Post key={item._id} postdata={item} ></Post>
        }
        )
    }
     </div>
 )
}

const mapStatetoProps =(state)=> {
    console.log("Posts.js mapStatetoProps ",state)
    return{
        isPostAdded:state.isPostAdded
    }   
    }
    
 const mapdispatchtoprops=(dispatch)=> {
    console.log("Posts.js mapStatetoProps ",dispatch)
     return{
            setPostAdded: ()=> {dispatch(setPostAdded())},
            resetPostAdded : ()=> {dispatch(resetPostAdded())}
           }
    }
    
export default connect(mapStatetoProps,mapdispatchtoprops)(Posts);
