import React, { useContext } from 'react'
import { Context } from '..'
import { ThreeDots } from 'react-loader-spinner';

const Profile = () => {
    const { isAuthenticated, loading, user } = useContext(Context);
    console.log(user);

    if (!isAuthenticated) return <h4>Login First</h4>

    return (
        <div className='profile'>
            {loading ? <ThreeDots color='#000' /> : (
                <div className='profile__data'>
                    <h4>{user?.name}</h4>
                    <p>{user?.email}</p>
                </div>
            )}
        </div>
    )
}

export default Profile