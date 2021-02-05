import React from 'react';
import '../Comment/Comment.css';

const Comment=(props)=>{
    console.log(props)
    return (
        <>
            <div className="row commentRow">
                <div className="col-sm-2" style={{textAlign:'right'}}>
                  {props.comment.commentby + " :"}
                </div>
                <div className="col-sm-7">
                {props.comment.comment}
                </div>
                <div className="col-sm-3 timeStamp">
                {props.comment.commentdate}
                </div>
            </div>
        </>
    );
}

export default Comment;