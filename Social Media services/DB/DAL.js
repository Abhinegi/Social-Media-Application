const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/Socialmedia', {useNewUrlParser: true});
const Schema=mongoose.Schema;
const post=new Schema({
    image:String,
    username:String,
    Likes:[],
    Comments:[],
    Caption:String,
    postdate:String,
    Emailid:String
});
const postModel = mongoose.model('postModel', post);

const User= new Schema({
    Username:String,
    Emailid:String,
    Password:String,
    MobileNo:String,
    Image:String,
    Profile:{},
    Following:[],
    Followers:[],
})

const UserModel= mongoose.model('users',User);

exports.getUserPost=(username,callback)=>{
    UserModel.find({Username:username},(error,res)=>{
        if(!error && res && res.length>0){
            postModel.find({$or:[{'username':username},{Emailid:{$in:res[0].Followers}},{Emailid:{$in:res[0].Following}}], image: { $ne: '' }},'username image Likes Caption',{sort: '-postdate'},(error,res)=>{
                if(!error && res && res.length>0)
                {
                    callback(res);
                }
                else
                   callback(null);
            }); 
        }
        else{
            callback([]);
        }    
      
    })
    
}

exports.postUserData=(post)=>{
    postModel.insertMany([{username:post.username, image:post.image,Caption:post.Caption, postdate:post.postdate,Emailid:post.emailid}],(error,res)=>{
        if(!error)
            return true;
        else
            return false;
    });
}


exports.likePost=(postdata,callback)=>{
    postModel.updateOne({"_id":postdata._id,"Likes":{"$nin": [postdata.emailid] }},{$push:{"Likes":postdata.emailid}},{"upsert": false },(error,res)=>{
        if(!error){
           callback(true);
        }
        else{
          callback(false);
        }
    });
}

exports.removeLikePost=(postdata,callback)=>{
    postModel.updateOne({"_id":postdata._id},{$pull:{"Likes":postdata.emailid}},{"upsert": false },(error,res)=>{
        if(!error){
           callback(true);
        }
        else{
          callback(false);
        }
    });
}


exports.addComment=(postdata,callback)=>{
    postModel.updateOne({"_id":postdata._id},{$push:{"Comments":{comment:postdata.comment,commentdate:postdata.commentdate,commentby:postdata.commentby}}},{"upsert": false },(error,res)=>{
        if(!error){
           callback(true);
        }
        else{
          callback(false);
        }
    });
}



exports.getComments=(id,callback)=>{
    postModel.find({"_id":id},'Comments',(error,res)=>{
        if(!error){
           callback(res);
        }
        else{
          callback(null);
        }
    });
}


exports.login=(post, callback)=>{
    UserModel.find({Username:post.username, Password:post.password },(err, res)=>{
        if( !err && res.length>0){
            callback(true);
        }
        else{
            callback(false);
        }
    })
}

exports.signup=(post, callback)=>{
    UserModel.insertMany({Username:post.username, Password:post.password ,Emailid:post.emailid, MobileNo:post.mobileno, Image: '' },(err, res)=>{
        if(!err){
            callback(true);
        }
        else{
            callback(false);
        }
    })
}


exports.checkUser= (post,callback)=>{
    UserModel.find({Emailid: post.emailid},(err, res)=>{
        if(!err && res.length>0)
            callback(true);
        else
            callback(false);    
    })
}

exports.saveProfile= (post,callback)=>{
    UserModel.updateOne({Emailid: post.emailid},{Profile :{Bio:post.bio, DateOfBirth:post.dateofbirth},Image:post.image , Username:post.username},(err, res)=>{
        if(!err)
            callback(true);
        else
            callback(false);    
    })
}

exports.getProfile= (emailid,callback)=>{
    UserModel.find({Emailid: emailid},(err, res)=>{
        if(!err){
            callback(res);
        }
        else
            callback(false);    
    })
}

exports.getPostImages=(emailid, callback)=>{
    postModel.find({Emailid:emailid},'image',(err,res)=>{
        if(!err)
            callback(res);
        else
            callback([])    
    })
}

exports.getPostsCount=(emailid,callback)=>{
    postModel.count({Emailid:emailid}, (err,res)=>{
                if(!err)
                    callback(res)
                else
                    callback(false)    
    })
}

exports.getFollowers=(emailid,callback)=>{
    UserModel.find({Emailid:emailid},'Followers',(err,res)=>{
        if(!err)
        callback(res);
        else
        callback(false)
    })
}

exports.getFollowing=(emailid,callback)=>{
    UserModel.find({Emailid:emailid},'Following',(err,res)=>{
        if(!err)
        callback(res);
        else
        callback(false)
    })
}

exports.getFollowerswithImage=(emailid,callback)=>{
    UserModel.find({Emailid:emailid},'Followers',(err,res)=>{
        if(!err)
        callback(res);
        else
        callback(false)
    })
}

exports.followUser=(postdata,callback)=>{
    UserModel.updateOne({Emailid:postdata.emailid,"Followers":{"$nin": [postdata.toFollowemailid] }},{$push:{"Followers":postdata.toFollowemailid}},{"upsert": false },(error,res)=>{
        if(!error)
        callback(res);
        else
        callback(false)
    })
}



exports.unfollowUser=(postdata,callback)=>{
    UserModel.updateOne({Emailid:postdata.emailid,"Followers":{"$in": [postdata.toFollowemailid] }},{$pull:{"Followers":postdata.toFollowemailid}},{"upsert": false },(error,res)=>{
        if(!error)
        callback(res);
        else
        callback(false)
    })
}

