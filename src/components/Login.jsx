import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Context, server } from '..';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context);

    const submitHandler = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            const { data } = await axios.post(`${server}/users/login`, {
                email, password
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            })
            console.log(data);
            toast.success(data.message);
            setIsAuthenticated(true);
            setLoading(false)
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message);
            setIsAuthenticated(false);
            setLoading(false);
        }
    };

    if (isAuthenticated) return <Navigate to={"/"} />

    return (
        <div className='login form-container'>
            <form className='form' onSubmit={submitHandler}>
                <input
                    type="email"
                    placeholder='Email'
                    name='email'
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)} />
                <input
                    type="password"
                    placeholder='Password'
                    name='password'
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)} />
                <button type='submit' disabled={loading}>Log In</button>
                <h4>Or</h4>
                <Link to={"/register"}>Sign Up</Link>
            </form>
        </div>
    )
}

export default Login