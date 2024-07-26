import Secrets from './Secrets'
import React, {useContext, useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom';
import userContext from '../context-user/userContext';

export const Home = () => {
    const history = useHistory();
    const authtoken = localStorage.getItem('token');
    const gUser = localStorage.getItem('user');
    const context = useContext(userContext);
    const { getUser} = context;
    const [userFetched, setUserFetched] = useState(false);

    useEffect(() => {
        if (!authtoken && !gUser) {
            history.push("/login");
        } else if (!userFetched) {
            getUser();
            setUserFetched(true);
        }
        // eslint-disable-next-line
    }, [authtoken, gUser, history, userFetched]);
    return (

        <>
            {
                authtoken || gUser ?
                    <div>
                        <Secrets/>
                    </div> : null
            }
        </>
    )
}