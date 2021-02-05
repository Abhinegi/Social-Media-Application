import React,{useState} from 'react';
import './Signup.css';
import Axios from 'axios';

const Signup=(props)=>{  
    const [username, setUsername]=useState('');
    const [password, setPassword]=useState('');
    const [mobileno, setMobileno]=useState('');
    const [emailid, setEmailid]=useState('');
    const [enableSignupBtn,setenableSignupBtn]=useState(false);
    const [error,setError]=useState('');
    const [passwordStrength,setpasswordStrength]=useState('');

    if(username!=='' && password!=='' && mobileno!=='' && emailid!=='' && !enableSignupBtn){
        console.log('inside validar')
        setenableSignupBtn(true);
    }

    function ValidateForm(){
        if(mobileno.length!==10){
            setError('Length of Mobile number should be 10');
            return false
        }
        if(passwordStrength.toLowerCase()==="weak password"){
            setError('Password strength is weak')
            return false;
        }
        return true;
    }

   function passwordStrengthHandler(e){
        const currentpassword= e.target.value.toString();
        var capitalLetter=false;
        var smallLetter=false;
        var specialSymbol=false;
        var numbervalue=false;
        for(var i=0;i<currentpassword.length;++i)
        {   
            if(currentpassword[i]>='A' && currentpassword[i]<='Z'){
                capitalLetter=true;
            }
            else if(currentpassword[i]>='a' && currentpassword[i]<='z'){
                smallLetter=true;
            }
            else if(!isNaN(currentpassword[i])){
                numbervalue=true;
            }
            else{
                specialSymbol=true;
            }
        }

        if(capitalLetter && smallLetter && numbervalue && specialSymbol && currentpassword.length>=8){
            setpasswordStrength('Strong Password');
        }
        else{
            setpasswordStrength('Weak Password');
        }
     
    }

    function signupHandler(e){
        if(ValidateForm())
        {
            Axios.post('http://localhost:3001/signup',{username:username,password:password,emailid:emailid, mobileno:mobileno}).then(
                res=>{
                    console.log("Signup response: ",res);
                    if(res.data==='username already present'){
                         setError('Username already present!!');
                    // else{
                    //     redirect to profile page
                    // }     
                    }
                }
            )
        }
    }

    function redirectToLogin(){
        
    }

    return (
        <>
            <form className="signupBox">
                <div className="form-group">
                    <label> Username </label>
                    <input type='text' className="form-control" value={username} onChange={e=>{ setUsername(e.target.value)}}/>
                </div>

                <div className="form-group">
                    <label> Password </label>
                    <input type='password' maxLength="20" className="form-control"  value={password}  onChange={e=>{ passwordStrengthHandler(e); setPassword(e.target.value)}}/>
                    <label className="noteText"> Please add atleast an uppercase, a lowercase, a number and a special symbol in password and length should be atleast 8 characters.</label>
                   { passwordStrength!==''?  <span className="passwordStrength">  {" --- " + passwordStrength} </span> : null }
                </div>

                 <div className="form-group">
                    <label> EmailId </label>
                    <input type='emailid' className="form-control"  value={emailid} onChange={e=>{ setEmailid(e.target.value)}}/>
                </div>


                <div className="form-group">
                    <label> Mobile Number </label>
                    <input type='number' className="form-control"  value={mobileno} onChange={e=>{ setMobileno(e.target.value)}}/>
                </div>

                <div className="form-group">
                    <button disabled={!enableSignupBtn} type="button" className="btn btn-light w-50" onClick={(e)=>{ signupHandler(e)}}> Signup </button>
                </div>

                <div className="form-group">
                    <p className="loginLink" onClick={()=>{ redirectToLogin()}}> Already have a account.. Login here </p>
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


export default Signup;