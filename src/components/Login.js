import React, {useState, useContext} from 'react'
import { Link, useHistory } from 'react-router-dom';
import alertContext from '../context-alert/alertContext';
import { GoogleLogin } from '@react-oauth/google';
//import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
    const [credentials, setCredentials]= useState({email: '', password:''});
    const context = useContext(alertContext);
    const {showAlert} = context;
    const host = process.env.REACT_APP_HOST;
    let history = useHistory();

  
// This function will be called upon a successful login
const handleSuccess = (credentialResponse) => {

  const responsePayload = jwtDecode(credentialResponse.credential);
  console.log("response", responsePayload)  

  localStorage.setItem('user', JSON.stringify( {name : responsePayload.name, email: responsePayload.email, userId: responsePayload.sub}));
  history.push("/")
 showAlert("Loggedin Successfully", "success")


}

const handleError = (errorResponse) => {
  console.error('Google login failed', errorResponse);
};

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`,{
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        })
        const json = await response.json()
        if (json.success){
            // save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
             history.push("/")
            showAlert("Loggedin Successfully", "success")
        }
        else{
            showAlert("Invalid credentials", "danger");
        }
    }

    const onChange = (e)=> {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div className='container mt-5' style={{maxWidth : '400px'}}>
            <h2>Login to countinue to Inotebook</h2>
            <form  onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                </div>

                <button type="submit" className="btn btn-primary w-100">Submit</button>
           
            <div className="text-center my-3">or</div>

            <div>  <GoogleLogin
      onSuccess={handleSuccess}
      onError={handleError}
      width= {350}
      size='large'
      
    /></div>
    <div class="mt-3 text-center">
      <Link to="/signup">Don't have an account? Register here</Link>
    </div>
    </form>
        </div>
    )
}

export default Login
