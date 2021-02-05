import React,{useState,useEffect} from 'react';
import Axios  from 'axios';
import Compressor from 'compressorjs';
import './AddPost.css';
import Modal from 'react-bootstrap/Modal';
import {setPostAdded,resetPostAdded} from '../../Actions/Action';
import {connect} from 'react-redux';

const AddPost=(props)=>{
    const [image,setImage]=useState('');
    const [caption,setCaption]=useState('');
    
    function upload(){
        var currentdate = new Date(); 
        var datetime =  currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() +"  "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes();

        Axios.post('http://localhost:3001/postUserData',{username:"Topson", image:image, Caption:caption, postdate:datetime ,emailid:'Topson@gmail.com'}).then(
            res=>{
                console.log(res);
                
                alert('uploaded successfully');
                props.setPostAdded();
                setCaption('');
                setImage('');
            }
        )
    }

    function clearImage(){
        setImage('');
    }

    function onChangeImage(e)
    { 
        if(e.target.files.length>0)
        {
        const file = e.target.files[0];
        console.log("before compress file : ",file)
        new Compressor(file,{
            quality:0.4,
            success(result){
                console.log("inside compressore ",result)
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

    return (
        <>
    <Modal
        size="lg"
        show={true}
        onHide={()=>{props.closeAddPostModal()}}
        aria-labelledby="example-modal-sizes-title-lg">

        <Modal.Header closeButton >
          <Modal.Title id="example-modal-sizes-title-lg">
            Add Post
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="addPostlayout">
                <div>
                    {
                       image===''? 
                   <div className="withoutImage">
                   <input type='file' onChange={(e)=>{onChangeImage(e)}}  className="addimagebtn"/>
                      {/* <h2 className="addImageText"> + Add Image </h2>  */}
                   </div>
                   :
                   <div className="withImage">
                          <img className="imageBox" src={image} alt="Add image"/>
                   </div>
                    }               
                </div>
                <div>
                    <label> Caption (Optional) :  </label>
                    <input type="text"  value={caption} onChange={(e)=>{setCaption(e.target.value)}} className="form-control"/>
                </div>
                <div className="buttonsets">
                    <button  className="btn badge-primary  mr-2" onClick={()=>{ clearImage() }}> Clear</button>
                    <button className="btn badge-primary" onClick={()=> { upload() }}> Add Post </button>
                </div>
            </div>
        </Modal.Body>
      </Modal>
        </>
    );
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

export default connect(mapStatetoProps,mapdispatchtoprops)(React.memo(AddPost));