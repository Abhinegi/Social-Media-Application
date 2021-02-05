const express=require('express');
const BL=require('./BusinessLayer')
const jwt= require('jsonwebtoken');
const routes=express.Router();
const authenticator= require('../Middlewares/Authenticator');
const querystring=require('querystring');
var url = require('url');

routes.post('/login',(req,res,next)=>{
    BL.login(req.body,(data)=>{
        if(data){
            const authToken= jwt.sign({username: req.body.username , password: req.body.password},'SportsSocialMedia');
            res.json(authToken);
        }
        else
            res.send(false);
    })
})

routes.get('/getUserData/:username',authenticator.jwtAuthentication,(req,res,next)=>{
     let page = +(querystring.parse(url.parse(req.url).query).page).trim();
     console.log("page", page)
     BL.getUserData(req.params.username,(data)=>{
            if(data!=null){
                let filter = data.slice(5*(page-1),5*page);
                res.send(filter);
            }
            else {
            res.send(data);
            }
     });
});

routes.post('/postUserData',(req,res,next)=>{
    res.send(BL.postUserData(req.body));
});

routes.post('/addlike',(req,res,next)=>{
   BL.addLike(req.body,(data=>{
       res.send(data);
   }));
});


routes.post('/removeLike',(req,res,next)=>{
    BL.removeLike(req.body,(data=>{
        res.send(data);
    }));
 });

 routes.post('/addComment',(req,res,next)=>{
    BL.addComment(req.body,(data=>{
        res.send(data);
    }));
 });
 

 routes.get('/getComments/:id',(req,res,next)=>{
    BL.getComments(req.params.id,(data=>{
        res.send(data);
    }));
 });

 routes.post('/signup',(req,res,next)=>{
    BL.signup(req.body,(data=>{
        res.send(data);
    }));
 });


 routes.post('/saveProfile',(req,res,next)=>{
    BL.saveProfile(req.body,(data=>{
        res.send(data);
    }));
 });

  routes.get('/getProfile/:emailid',(req,res,next)=>{
    BL.getProfile(req.params.emailid,(data=>{
        res.send(data);
    }));
 });


 
 routes.get('/getPostImages/:emailid',(req,res,next)=>{
    BL.getPostImages(req.params.emailid,(data=>{
        res.send(data);
    }));
 });


  
 routes.get('/getFollowers/:emailid',(req,res,next)=>{
    BL.getFollowerswithImage(req.params.emailid,(data=>{
        res.send(data);
    }));
 });


   
 routes.post('/followUser',(req,res,next)=>{
    BL.followorUnfollowUser(req.body,(data=>{
        res.send(data);
    }));
 });

 routes.post('/unfollowUser',(req,res,next)=>{
    BL.unfollowUser(req.body,(data=>{
        res.send(data);
    }));
 });

module.exports=routes;