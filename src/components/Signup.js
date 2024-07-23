import React, {useState, useContext} from 'react'
import { useHistory } from 'react-router-dom';
import alertContext from '../context-alert/alertContext';

const Signup = (props) => {

    const [credentials, setCredentials]= useState({name: '', email: '', password:'', cpassword:''});
    const context = useContext(alertContext);
    const {showAlert} = context;
    const host = process.env.HOST;
    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name, email, password}= credentials;
        const response = await fetch(`${host}/api/auth/createuser`,{
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name,email, password})
        })
        const json = await response.json()
        if (json.success){
            // save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            history.push("/")
            showAlert("Account Created Successfully", "success")
        }
        else{
            showAlert("Invalid Details", "danger")
        }
    }

    const onChange = (e)=> {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    return (
        <div className='container mt-2' >
            <h2>Create an account to use Inotebook</h2>
        <form  onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">name</label>
                <input type="text" className="form-control" value={credentials.name} onChange={onChange} id="name" name="name" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">  
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" minLength={5} required/>
            </div>
            <div className="mb-3">  
                <label htmlFor="cpassword" className="form-label">confirm Password</label>
                <input type="password" className="form-control" value={credentials.cpassword} onChange={onChange} name="cpassword" id="password" minLength={5} required />
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
    )
}

export default Signup
