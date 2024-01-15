import React, {useContext, useState} from 'react'
import secretContext from '../context-secrets/secretContext'

const AddSecret = (props) => {
        const context = useContext(secretContext);
        const {addSecret} = context;
    
        const [secret, setSecret] = useState({description: ""})
    
        const handleClick = (e)=>{
            e.preventDefault();
            addSecret( secret.description);
            setSecret({ description: ""})
            props.showAlert("Added successfully", "success");
        }
    
        const onChange = (e)=>{
            setSecret({...secret, [e.target.name]: e.target.value})
        }
        return (
            <div className='container my-3'>
                <h2>Please ! write down your secret.</h2>
                <form className='my-3'>
    
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" value={secret.description} onChange={onChange} minLength={5} required />
                    </div>
                    
    
                    <button disabled={secret.description.length<5} type='submit' className='btn btn-primary' onClick={handleClick} >Add Secret</button>
                </form>
            </div>
    );
}

export default AddSecret;
