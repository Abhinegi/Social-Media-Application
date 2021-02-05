import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import './Postgrid.css';
import Loader from '../../Loader/Loader';
import Modal from 'react-bootstrap/Modal';


const Postgrid = props=>{
    const [postimages, setPostImages]=useState([]);
    const [isloading,setIsLoading]=useState(false);
    const [imageModal, setImageModal]=useState(false);
    const [modalImage,setModalImage]=useState('');

    function openImageModal(image){
        setImageModal(true);
        setModalImage(image);
    }

    function closeImageModal(){
        setImageModal(false);
    }

    useEffect(()=>{
        console.log(imageModal);
        setIsLoading(true);
            Axios.get('http://localhost:3001/getPostImages/Saksa@gmail.com').then(
                res=>  {
                    setPostImages(res.data);
                    setIsLoading(false);
                  },
                 err=>  setIsLoading(false)
              );
    },[]);

    return (
        <>
        {
        imageModal ?  <Modal 
        size="lg"
        show={true}
        onHide={()=>{setImageModal(false)}}
        aria-labelledby="example-modal-sizes-title-lg">

        <Modal.Header style={{padding:'0px'}} closeButton >
        <img src={modalImage}  className="modalImage"></img>
        </Modal.Header>
         </Modal> : null
       }
        <hr/>
           { isloading?<Loader/>:null}
            <div className="row rowPostgrid">
                {
               postimages.map((item,index)=>{
                    return (
                       <img onClick={e => {openImageModal(item.image)}} className="imagePostgrid col-sm-4" key={index} src={item.image}></img>
                    );
                } )
                }
            </div>
        </>
    )
}

export default Postgrid;