import SecretContext from "./secretContext";
import alertContext from "../context-alert/alertContext";
import { useState, useContext } from "react";

const SecretState = (props) => {
  const host = "https://secret-sharing-backend.vercel.app"
  const secretsInitial = []
  const [secrets, setSecrets] = useState(secretsInitial)
  const authToken = localStorage.getItem('token')
  const gUser = JSON.parse(localStorage.getItem('user'));
  const alrtContext = useContext(alertContext)
  const {showAlert} = alrtContext;

   // Get all Secrets
   const getSecrets = async () => {
    // API Call 
    const response = await fetch(`${host}/api/secrets/fetchallsecrets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": authToken
      },
      body: JSON.stringify({user: {id: gUser.userId}})
    });
    const json = await response.json() 
    setSecrets(json)
  }

   // Add a Secret
   const addSecret = async ( description) => {
    // TODO: API Call
    // API Call 
    const response = await fetch(`${host}/api/secrets/addsecret`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": authToken
      },
      body: JSON.stringify({description, user: {id: gUser.userId}})
    });

    const secret = await response.json();
    if (secret.error){
      showAlert("You have already posted your one secret", "danger");
    }
    else{
      showAlert("Added successfully", "success");
      setSecrets(secrets.concat(secret));
    }
    
  }
  return (
    <SecretContext.Provider value={{ secrets, addSecret, getSecrets }}>
      {props.children}
    </SecretContext.Provider>
  )

}
export default SecretState
