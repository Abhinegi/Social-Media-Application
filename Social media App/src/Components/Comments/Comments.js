import React,{useState, useEffect} from 'react';
import Comment from './Comment/Comment';
import './Comments.css'
import Modal from 'react-bootstrap/Modal';
import Axios from 'axios';

 const Comments=(props)=>{

    const [showModal,setShowModal]=useState(true);
    const [comments,setComments]=useState([]);

    var comment=React.createRef();

    useEffect(()=>{
        Axios.get('http://localhost:3001/getComments/'+props.postdata._id).then(
            res=>{
                if(res.data.length>0 && res.data[0]['Comments']!==null)
                setComments(res.data[0].Comments)
            }
        );
    },[])

    function postComment(){
        if(comment.current.value!=undefined && comment.current.value!=="" ){
            var currentdate = new Date(); 
            var datetime =  currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/" 
                    + currentdate.getFullYear() +"  "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes();

            Axios.post('http://localhost:3001/addComment',{_id:props.postdata._id, comment:comment.current.value, commentdate:datetime ,commentby:'Topson'}).then(
                res=> {
                    console.log(comments)
                    alert('Comments Added!!')
                    const newcomment= comment.current.value;
                    comment.current.value="";
                    setComments(prevcomments=> [...prevcomments,{ comment:newcomment, commentdate:datetime ,commentby:'Topson'}])
                }
            )
        }
    }

    return (
        <>
      <Modal
        size="lg"
        show={showModal}
        onHide={()=>{props.closeCommentsHandler()}}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton >
          <Modal.Title id="example-modal-sizes-title-lg">
            Comments
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='commentModal'>
                {
                    comments.map((item,index)=>{
                        return <Comment key={index} comment={item}></Comment>
                    })
                }
                <div className="row commentInput">
                    <div className="col-sm-10 form-group row" >
                        <input type="text" ref={comment} onKeyPress={(e)=>{ if(e.key==="Enter") postComment()}} placeholder="Add comments..." className="col-sm-10 input form-control" />
                    </div>
                    <div className="col-sm-2 form-group">
                        <button className="btn btn-dark" onClick={()=>{ postComment()}}> Post </button>
                    </div>
                </div>
        </Modal.Body>
      </Modal>
        </>
    );
}


export default Comments;