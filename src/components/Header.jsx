import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { Context, server } from '..'
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Header = () => {
    const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context);

    const logoutHandler = async (e) => {
        setLoading(true)
        e.preventDefault();
        try {
            await axios.get(`${server}/users/logout`, {
            }, {
                withCredentials: true,
            })
            toast.success("Logout Successfully");
            setIsAuthenticated(false);
            setLoading(false)
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message);
            setIsAuthenticated(true);
            setLoading(false)
        }
    };
    return (
        <div className='header'>
            <div className="header__title">
                <h1>Todo App.</h1>
            </div>
            <div className="header__links">
                <NavLink to={"/"}>Home</NavLink>
                <NavLink to={"/profile"}>Profile</NavLink>
                {
                    isAuthenticated ? (
                        <button className='btn' disabled={loading} onClick={logoutHandler} >Log out</button>
                    ) : (
                        <NavLink to={"/login"}>Login</NavLink>
                    )
                }
            </div>
        </div>
    )
}

export default Header