import SecretContext from "./secretContext";
import { useState } from "react";

const SecretState = (props) => {
  const host = "http://localhost:5000"
  const secretsInitial = []
  const [secrets, setSecrets] = useState(secretsInitial)
  const authToken = localStorage.getItem('token')

   // Get all Secrets
   const getSecrets = async () => {
    // API Call 
    const response = await fetch(`${host}/api/secrets/fetchallsecrets`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": authToken
      }
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
      body: JSON.stringify({description})
    });

    const secret = await response.json();
    setSecrets(secrets.concat(secret));
  }
  return (
    <SecretContext.Provider value={{ secrets, addSecret, getSecrets }}>
      {props.children}
    </SecretContext.Provider>
  )

}
export default SecretState
