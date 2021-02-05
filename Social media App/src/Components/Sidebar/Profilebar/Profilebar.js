import React,{useState ,useEffect} from 'react';
import './Profilebar.css'
import Axios from 'axios';
import Followers from '../../Followers/Followers'
import {connect} from 'react-redux';
import {getProfileData} from '../../../Actions/Action'


const Profilebar= (props)=>{

    const [image,setImage]=useState('');
    const [username,setUsername]=useState('');
    const [postCount,setPostsCount]=useState(0);
    const [followers,setFollowers]=useState(0);
    const [following,setFollowing]=useState(0);
    const [showfollowers,setShowFollowers]=useState(false);
    const [Bio,setBio]=useState('');


    useEffect(()=>{
        props.getProfileData('Saksa@gmail.com');
        // Axios.get('http://localhost:3001/getProfile/Saksa@gmail.com').then(
        //     res=>{
        //         console.log(res);
        //         if(res.data){
        //            setUsername(res.data.Username);
        //            setImage(res.data.Image);
        //            setPostsCount(res.data.PostsCount);
        //            setFollowers(res.data.Followers);
        //            setFollowing(res.data.Following);
        //            setBio(res.data.Bio);
        //         }
        //     }
        // )
    },[]);

   function  showFollowerModal(){
      setShowFollowers(false);
      props.getProfileData('Saksa@gmail.com');
    }
    return (
<>
<div className="card_profilebar">
  <img src={props.profileData.Image} alt="John" style={{width:'100%'}}/>
  <h3 className='profileText'>{props.profileData.Username}</h3>
    <p className='profileText'>{props.profileData.Bio}</p>
  <div className="card-body row">
     <div className="col-sm-4 profileText">
             Post : {props.profileData.PostsCount}
                     </div>
                     <div className="col-sm-4 profileText">
                         followers : {props.profileData.Followers}
                     </div>

                     <div className="col-sm-4 profileText">
                         following : {props.profileData.Following}
                 </div>
               </div>
  <p><button className="button_Profilebar" onClick={()=>{setShowFollowers(true)}}>Followers</button></p>
</div>
{
showfollowers?<Followers closeModal={showFollowerModal} emailid={"Saksa@gmail.com"}></Followers>:null
}

        </>
    )
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
    
export default connect(mapStatetoProps,mapdispatchtoprops)(Profilebar);

