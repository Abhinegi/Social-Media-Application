import Axios from 'axios';

     export  function setPostAdded(){
        return {
            type: "SETPOSTADDED",
            payload:""
        }
    }


    export   function resetPostAdded(){
        return {
            type: "RESETPOSTADDED",
            payload:""
        }
    }


    

    export  function getProfileData(emailid){
        return dispatch =>{
        Axios.get('http://localhost:3001/getProfile/'+emailid).then(
            res=>{
                console.log("profile res",res);
                dispatch({type:'Profile',payload:res.data});
            }
        )}
    }
