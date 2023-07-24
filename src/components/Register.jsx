import axios from 'axios';
import React, { useContext, useState } from 'react'
import { toast } from 'react-hot-toast';
import { Link, Navigate } from 'react-router-dom'
import { Context, server } from '../index';

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context);

    const submitHandler = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            const { data } = await axios.post(`${server}/users/new`, {
                name, email, password
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            })
            toast.success(data.message);
            setIsAuthenticated(true);
            setLoading(false);
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error)
            setIsAuthenticated(false);
            setLoading(false);
        }
    };

    if (isAuthenticated) return <Navigate to={"/"} />;

    return (
        <div className='register form-container'>
            <form className='form' onSubmit={submitHandler}>
                <input
                    type="text"
                    name='name'
                    placeholder='Name'
                    required
                    value={name}
                    onChange={e => setName(e.target.value)} />
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
                    name='pwd'
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)} />
                <button type='submit' disabled={loading}>Sign Up</button>
                <h4>Or</h4>
                <Link to={"/login"}>Log In</Link>
            </form>
        </div>
    )
}

export default Register