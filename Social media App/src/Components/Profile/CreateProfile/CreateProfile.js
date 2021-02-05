import React,{useState,useEffect} from 'react';
import Compressor from 'compressorjs';
import Axios from 'axios';
import './CreateProfile.css'


const CreateProfile= props=>{
    const [image,setImage]=useState('');
    const [bio,setBio]=useState('');
    const [dateofbirth,setDateOfBirth]=useState('');
    const [error,setError]=useState('');
    const [username,setUsername]=useState('');



    useEffect(()=>{
        Axios.get(`http://localhost:3001/getProfile/Saksa@gmail.com`).then(
            res=>{
                     var profiledata=res.data;
                     console.log('indised create profiles',profiledata);
                     setImage(profiledata.Image);
                     setUsername(profiledata.Username)
                     if(profiledata["Bio"]!==null){
                        setBio(profiledata.Bio);
                     }   
                     if(profiledata["DOB"]!==null){
                        setDateOfBirth(profiledata["DOB"]);
                     }   

            }
        )
    },[]);


    function clearImage(){
        setImage('');
    }

    function validiteProfile(){
        if(image==='')
        {
            setError('Please upload image...');
            return false;
        }

        if(dateofbirth==='')
        {
            setError('Please add Date of birth...')
            return false;
        }
        return true;
    }

    function saveProfile(){
        if(validiteProfile()){
            Axios.post('http://localhost:3001/saveProfile',{emailid:'Saksa@gmail.com', bio:bio, dateofbirth:dateofbirth, image:image, username:username}).then(
                res=> {
                    if(res.data) {
                    }
                     props.history.push('/')
                }
            )
        }
    }

    function onChangeImage(e)
    { 
        if(e.target.files.length>0)
        {
        const file = e.target.files[0];
        new Compressor(file,{
            quality:0.2,
            success(result){
                var primage=  new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        resolve(event.target.result);
                    };
                    reader.readAsDataURL(result);
                });
                primage.then(
                    res=>{
                        setImage(res)
                    }
                )
            }
        });
    }
    }

    function skip(){
        props.history.push('/')
    }

    return <>
    <form className="profileForm">
                 <div className="form-group imageDiv">
                     <div className="profileImage">
                         <img className="profileImage2" src={image===''||image===undefined?require('../../Assets/profile-anonymous.jpg'):image}/>
                     </div>
                   <input type='file' onChange={(e)=>{onChangeImage(e)}}  className="imageInput"/>
                   <button type="button"  className="btn badge-primary clearbutton" onClick={()=>{ clearImage() }}> Clear</button>
                 </div>

                    
                 <div className="form-group">
                    <label> Username: </label>
                    <input type="text" className="form-control" value={username} maxLength="30" onChange={e=>{ setUsername(e.target.value)}}/>
                 </div>
                   
                 <div className="form-group">
                    <label> Add Bio: (Optional) </label>
                    <textarea className="form-control" value={bio} onChange={e=>{ setBio(e.target.value)}} maxLength="300" rows="4" cols="80"/>
                 </div>
                       
                 <div className="form-group">
                    <label> Date Of Birth : </label>
                   <input type="Date" value={dateofbirth}  onChange={e=>{ setDateOfBirth(e.target.value)}} className="form-control"/>
                 </div>

                <div className="form-group">
                    <button  type="button" className="btn btn-primary" onClick={()=>{saveProfile()}}> Apply Changes </button>
                </div>

                <div className="form-group alert-danger">
                    {error}
                </div>

                <div className="form-group">
                    <button  type="button" className="btn btn-primary" onClick={()=>{skip()}}> Skip &gt;&gt; </button>
                </div>
    </form>
    </>;
}


export default CreateProfile;