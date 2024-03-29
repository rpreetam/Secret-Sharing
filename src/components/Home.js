import Secrets from './Secrets'
import React, {useContext, useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import userContext from '../context-user/userContext';

export const Home = () => {
    const history = useHistory();
    const authtoken = localStorage.getItem('token');
    const gUser = localStorage.getItem('user');
    const context = useContext(userContext);
    const { getUser} = context;

    useEffect(()=> {
        getUser();
        // eslint-disable-next-line
    },[]);
    return (

        <>
            {
                authtoken || gUser ?
                    <div>
                        <Secrets/>
                    </div> : history.push("/login")
            }
        </>
    )
}