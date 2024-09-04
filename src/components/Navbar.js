import React, { useContext } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import userContext from '../context-user/userContext';

const Navbar = () => {
    let history = useHistory();
    let location = useLocation();
    const context = useContext(userContext);
    const { user } = context;
    const token = localStorage.getItem('token');
    const gUser = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        history.push("/login");
    };

    return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
            <div className='container-fluid'>
                <Link className='navbar-brand' to='/'>Sharing Secrets</Link>
                
                <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                    <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                        <li className='nav-item'>
                            <Link
                                className={`nav-link ${location.pathname === "/" ? 'active' : ""}`}
                                aria-current='page'
                                to="/"
                            >
                                Home
                            </Link>

            
                        </li>
                        <li>
                        <Link
                                className={`nav-link ${location.pathname === "/about" ? 'active' : ""}`}
                                aria-current='page'
                                to="/about"
                            >
                                About
                            </Link>
                        </li>
                    </ul>
                    {!token && !gUser ? (
                        <form className='d-flex'>
                            {location.pathname !== "/login" ? (
                                <Link className='btn btn-primary mx-1' to='/login' role='button'>Login</Link>
                            ) : (
                                <Link className='btn btn-primary mx-1' to='/signup' role='button'>Signup</Link>
                            )}
                        </form>
                    ) : (
                        <>
                            <h5 style={{ color: "white", marginRight: "20px", fontFamily: "cursive"}}>
                                Welcome: {user ? user.name : (gUser && gUser.name)}
                            </h5>
                            <button onClick={handleLogout} className='btn btn-primary'>Logout</button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
