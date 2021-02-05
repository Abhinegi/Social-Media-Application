import React,{useState} from 'react';
import './Login.css';
import Axios from 'axios';

const Login=(props)=>{  
    const [username, setUsername]=useState('');
    const [password, setPassword]=useState('');
    const [error,setError]=useState('');

    function loginHandler(e){
            Axios.post('http://localhost:3001/login',{username:username,password:password}).then(
                res=>{
                    console.log("Login response: ",res);
                    if(res.data){
                            localStorage.setItem('socialmediaToken',res.data);
                    }
                    else{
                        setError('Invalid username or password...')
                    }    
                }
            )
    }

    function redirectToSignup(){
        
    }


    return (
        <>
            <form className="loginBox">
                <h2 className="text-center font-weight-bold heading"> Welcome </h2>
                <div className="form-group">
                    <label> Username </label>
                    <input type='text' className="form-control" value={username} onChange={e=>{ setUsername(e.target.value)}}/>
                </div>

                <div className="form-group">
                    <label> Password </label>
                    <input type='password' className="form-control"  value={password} onChange={e=>{ setPassword(e.target.value)}}/>
                </div>

                <div className="form-group">
                    <button type="button" disabled={username==''||password==''?true:false} className="btn btn-light w-50" onClick={(e)=>{ loginHandler(e)}}> Login </button>
                </div>
                
                <div className="form-group">
                 <p className="signupLink" onClick={()=>{redirectToSignup()}}> Create a new account!! </p>
                </div>
                {
                error===''? null:
                <div className="form-group alert-danger">
                    {error}
                </div>
                }
                
            </form>
        </>
    );

}


export default Login;