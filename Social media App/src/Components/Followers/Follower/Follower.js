import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import { withRouter } from 'react-router';



const Follower=(props)=>{

    function unfollowUser(tofollowemailid){
        Axios.post('http://localhost:3001/unfollowUser',{emailid:'Saksa@gmail.com',toFollowemailid:tofollowemailid}).then(
          res=>{
            console.log("res foolowe",res)
          }
        )
      }

function getUserProfile(emailid){
  console.log("profile view",props)
  props.history.push('/viewProfile/'+emailid);
}
return (
    <div className="row mb-3" >
                          <span className="col-sm-9" onClick={()=>{getUserProfile(props.item)}}> {props.item}  </span> 
    <button className="btn btn-dark col-sm-2" onClick={()=>{unfollowUser(props.item)}}>  Follow </button>
    </div>
)
}


export default withRouter(Follower);
