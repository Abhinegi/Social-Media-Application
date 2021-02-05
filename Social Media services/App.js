const express= require('express');
const bodyparser=require('body-parser');
var cors = require('cors');
const routes=require('./Middlewares/router')
const app=express();

app.use(cors());
app.use(bodyparser.json({limit: '5mb'}));
app.use('/',routes);

var Port = 3001;

app.listen(Port,()=>{
    console.log("server started at port ",Port);
});
