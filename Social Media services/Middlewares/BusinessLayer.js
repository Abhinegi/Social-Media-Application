const db=require('../DB/DAL')

exports.getUserData=(username,callback)=>{
     db.getUserPost(username,(res)=>{
        callback(res);
    });
}

exports.postUserData=(post)=>{
    return db.postUserData(post);
}

exports.addLike=(post,callback)=>{
    return db.likePost(post,(res)=>{
        callback(res);
    });
}

exports.removeLike=(post,callback)=>{
    return db.removeLikePost(post,(res)=>{
        callback(res);
    });
}

exports.addComment=(post,callback)=>{
    return db.addComment(post,(res)=>{
        callback(res);
    });
}

exports.getComments=(id,callback)=>{
    db.getComments(id,(res)=>{
       callback(res);
   });
}

exports.login= (post,callback)=>{
    db.login(post, (res)=>{
        callback(res);
    })
}


exports.signup= (post,callback)=>{
    db.checkUser(post,data=>{
        if(!data){
            db.signup(post, (res)=>{
                callback(res);
            })
        }
        else
        {
            callback('username already present');
        }
    })
}



exports.saveProfile= (post,callback)=>{
    db.saveProfile(post,data=>{
                callback(data);
        })
}

exports.getProfile= (emailid,callback)=>{
    var profiledata={};
    db.getProfile(emailid,data=>{
        if(data && data.length>0){
            profiledata["Username"]=data[0].Username;
            profiledata["Image"]=data[0].Image;
            profiledata["Bio"]=data[0]["Profile"]!=null && data[0].Profile["Bio"]!=null?data[0].Profile["Bio"]:'';
            profiledata["DOB"]=data[0]["Profile"]!=null && data[0].Profile["DateOfBirth"]!=null?data[0].Profile["DateOfBirth"]:''
        }
        else
        {
            profiledata["Username"]="";
            profiledata["Image"]="";
            profiledata["Bio"]='';
        }

        db.getPostsCount(emailid,data=>{
            if(data)
             profiledata["PostsCount"]=data;
            else
            profiledata["PostsCount"]=0;

            db.getFollowers(emailid,data=>{
                if(data && data.length>0)
                profiledata["Followers"]=(data[0]["Followers"]).length;
                else
                profiledata["Followers"]=0;

                db.getFollowing(emailid,data=>{
                    if(data && data.length>0)
                    profiledata["Following"]=(data[0]["Following"]).length;
                    else
                    profiledata["Following"]=0;
                    callback(profiledata);
                  })
            })
        })
    })

}

exports.getPostImages= (emailid,callback)=>{
    db.getPostImages(emailid,data=>{
        callback(data);
    })
}

exports.getFollowers= (emailid,callback)=>{
    db.getFollowers(emailid,data=>{
        callback(data);
    })
}

exports.getFollowerswithImage= (emailid,callback)=>{
    db.getFollowerswithImage(emailid,data=>{
        callback(data);
    })
}

exports.followUser= (emailid,callback)=>{
    db.followUser(emailid,data=>{
        callback(data);
    })
}

exports.unfollowUser= (emailid,callback)=>{
    db.unfollowUser(emailid,data=>{
        callback(data);
    })
}