import React, { useContext, useEffect } from 'react'
import secretContext from "../context-secrets/secretContext"
import Secretitem from './Secretitem';
import AddSecret from './AddSecret';

const Secrets = (props) => {
    const context = useContext(secretContext);
    const {secrets , getSecrets} = context;
    useEffect(()=>{getSecrets()
    // eslint-disable-next-line
 },[])


 

    return (
        <>
            <AddSecret showAlert= {props.showAlert} />
            
            <div className="row my-3">
                <h2>You secrets</h2>
                <div className="container mx-2 my-2"> 
                {secrets.length===0 && 'No secrets to display'}
                </div>
                {secrets.map((secret) => {
                    return <Secretitem key={secret._id}  secret={secret} />
                })}
            </div>
        </>
    )
}

export default Secrets;
