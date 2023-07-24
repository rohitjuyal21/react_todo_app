import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Context, server } from '..';
import { toast } from 'react-hot-toast';
import TodoItem from './TodoItem';
import { Navigate } from 'react-router-dom';

const Home = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [tasks, setTasks] = useState([]);
    const ref = useRef(null);
    const { isAuthenticated } = useContext(Context)

    const updateHandler = async (id) => {
        try {
            const { data } = await axios.put(`${server}/task/${id}`,
                {},
                {
                    withCredentials: true,
                });

            toast.success(data.message)
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message);
        }
    }

    const deleteHandler = async (id) => {
        try {
            const { data } = await axios.delete(`${server}/task/${id}`,
                {
                    withCredentials: true,
                }
            );

            toast.success(data.message)
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message);
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios.post(`${server}/task/new`, {
                title,
                description,

            }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            toast.success(data.message);
            setTitle("");
            setDescription("");
            setLoading(false);
            ref.current.focus();
        } catch (error) {
            toast.error(error.response.data.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        axios.get(`${server}/task/my`, {
            withCredentials: true,
        }).then(res => {
            setTasks(res.data.tasks)
        }).catch(error => {

        })
    }, [tasks])

    if (!isAuthenticated) return <Navigate to={"/login"} />
    return (
        <div className='home'>
            <div className="form-container">
                <form className='form' onSubmit={submitHandler}>
                    <input
                        type="text"
                        placeholder='Title'
                        required
                        autoFocus
                        ref={ref}
                        value={title}
                        onChange={e => setTitle(e.target.value)} />
                    <input
                        type="text"
                        placeholder='Description'
                        required
                        value={description}
                        onChange={e => setDescription(e.target.value)} />
                    <button type="submit" disabled={loading}>Add Task</button>
                </form>
            </div>

            <div className="todosContainer">
                {tasks.map((task, key) => (
                    <TodoItem
                        title={task.title}
                        description={task.description}
                        isCompleted={task?.isCompleted}
                        updateHandler={updateHandler}
                        deleteHandler={deleteHandler}
                        id={task._id}
                        key={key} />
                ))}
            </div>
        </div>
    )
}

export default Home