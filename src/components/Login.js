import React, {useState, useContext} from 'react'
import { useHistory } from 'react-router-dom';
import alertContext from '../context-alert/alertContext';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';

const Login = () => {
    const [credentials, setCredentials]= useState({email: '', password:''});
    const context = useContext(alertContext);
    const {showAlert} = context;
    let history = useHistory();
     // This function will be called upon a successful login
  

     const responseGoogle = async (response) => {
      try {
        // Extract relevant information from the Google OAuth 
        console.log('res', response);
        const { profileObj } = response;
        console.log("prf obj",profileObj)
        const { email, name, googleId } = profileObj;
  
        // Send the user information to the backend using Axios
        const backendResponse = await axios.post('/api/login', {
          email,
          username: name,
          oauthId: googleId,
        });
  
        // Handle the backend response as needed
        console.log('Backend Response:', backendResponse.data);
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login",{
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
        <div>
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

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <div> <GoogleLogin
        clientId="1004074720628-kpffpjl3jt5msckvftv4cv4cju4s2rlf.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      /></div>
        </div>
    )
}

export default Login