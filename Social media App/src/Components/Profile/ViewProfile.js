import React,{useState,useEffect} from 'react';
import './ViewProfile.css';
import Axios from 'axios';
import Postgrid from '../Profile/Postgrid/Postgrid';
import {connect} from 'react-redux';
import {getProfileData} from '../../Actions/Action'

const ViewProfile= props=>{

    const [image,setImage]=useState('');
    const [username,setUsername]=useState('');
    const [postCount,setPostsCount]=useState(0);
    const [followers,setFollowers]=useState(0);
    const [following,setFollowing]=useState(0);

    useEffect(()=>{
        // props.match.params["id"]
        // props.getProfileData("Topson@gmail.com");
        // props.getProfileData(props.match.params["id"]);
        Axios.get('http://localhost:3001/getProfile/'+props.match.params["id"]).then(
            res=>{
                console.log(res);
                if(res.data){
                   setUsername(res.data.Username);
                   setImage(res.data.Image);
                   setPostsCount(res.data.PostsCount);
                   setFollowers(res.data.Followers);
                   setFollowing(res.data.Following);
                }
            }
          
        )
    },[props.profileData.Username,props.profileData.Followers,props.profileData.PostsCount,props.profileData.Image,props.profileData.Following]);

    return <>
           <div className="form-group imageDiv">
                     <div className="profileImage">
                         <img className="profileImage2" src={image===''||image===undefined?require('../Assets/profile-anonymous.jpg'):image}/>
                     </div>
           </div>
           <div className="form-group username">
                Username : {" "+username} 
           </div>

           <div className="form-group row container ml-5 mr-5">
              <div className="col-sm-4 pl-5 subheadingTextViewprofile">
                  Posts : {postCount}
              </div>
              <div className="col-sm-4 pl-5 subheadingTextViewprofile">
                  Followers :{followers}
              </div>
              <div className="col-sm-4 pl-5 subheadingTextViewprofile">   
                  Following: {following}
              </div>
           </div>

           <div className="mb-4">
            <Postgrid></Postgrid>
           </div>
    </>;
}

const mapStatetoProps =(state)=> {
    console.log("profile mapStatetoProps ",state)
    return{
        profileData:state.profile
    }   
    }
    
 const mapdispatchtoprops=(dispatch)=> {
    console.log("Posts.js mapStatetoProps ",dispatch)
     return{
            getProfileData:(emailid)=>{dispatch(getProfileData(emailid))}
           }
    }
    
export default connect(mapStatetoProps,mapdispatchtoprops)(ViewProfile);

