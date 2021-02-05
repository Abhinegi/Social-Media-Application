import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import './Post.css';
import { withRouter } from 'react-router';
import Comments from '../../Comments/Comments';


const Post=(props)=>{
    console.log("Post.js ",props)
    const [isliked, setIsLiked]=useState(false);
    const [openComments, setopenComments]=useState(false);

    function closeCommentsHandler(){
        setopenComments(false);
    }

    useEffect(()=>{
        if( props.postdata.Likes.indexOf("Saksa") !== -1){
            setIsLiked(true);
        }
    },[]);

    function clickLike(){
        let url='';
        
        if(isliked)
            url='http://localhost:3001/removeLike';
        else
            url='http://localhost:3001/addlike';    

        var postdata= {...props.postdata}
        if(postdata['image']!==null)
           delete postdata.image;
        Axios.post(url,postdata).then(
            res=>{
                if(res && res.status==200 && res.data)
                    setIsLiked(value => setIsLiked(!value)) 
                console.log(res)
            }
        )
    }

    function openCommentModal(){
        console.log("Inside open modal ",openComments)
        setopenComments(value=>!value);
    }

    return (
        <>
            <div className="postCard card mb-4">

                <div className="card-header HeaderText" onClick={()=>{  props.history.push('/viewProfile/'+props.postdata.username) }}>
                    <img src={props.postdata.image} className="profileImage-post"/>
                    {props.postdata.username}
                </div>
                 <div className="card-body cardBody">
                     <img  className="postImage" src={props.postdata.image} alt='loading...'/>
                 </div>   
                 <div className="card-footer"
                 >
                    <div className="row">
                        <div className="col-sm-3 CardFooter">
                        <h6 className={isliked?'like':'dislike'} onClick={()=>{ clickLike()}}>{ isliked?'Like :)' :'Liked?'} </h6>
                        </div>
                        <div className="col-sm-9  caption">
                            {/* Online MOBA game DOTA 2 online international tournament will start soon.. */}
                            {props.postdata.Caption}
                        </div>
                    </div>
                    <hr/>
                    <div className="row comments">
                        <div className="col-sm-3 commentName commentLink" onClick={()=>{openCommentModal()}}>
                           View Comments ...
                        </div>
                    </div>

                 </div>   
            </div>
            {
             openComments?
             <Comments closeCommentsHandler={closeCommentsHandler} postdata={props.postdata}/>
             :null
            }
        </>
    );
}

export default withRouter(React.memo(Post));