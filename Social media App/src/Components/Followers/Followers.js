import React,{useState,useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import Axios from 'axios';
import Follower from './Follower/Follower'


const Followers=(props)=>{
    const [followers,setFollowers]=useState([]);
    const [showModal,setShowModal]=useState(true);

    useEffect(()=>{
        Axios.get('http://localhost:3001/getFollowers/'+props.emailid).then(
        res=>{
            console.log(res);
            if(res.data.length>0)
            setFollowers(res.data[0]["Followers"]);
        }
        )
    },[])


    

return (
    <>
          <Modal
        size="lg"
        show={showModal}
        onHide={()=>{props.closeModal()}}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton >
          <Modal.Title id="example-modal-sizes-title-lg">
            Followers
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
               {
                   followers.map((item,index)=>{
                     return <Follower key={index} index={index} item={item}></Follower>
                   })
               }
        </Modal.Body>
      </Modal>
    </>
);
}

export default Followers;