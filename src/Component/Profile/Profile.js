import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/ContextProvider';

const Profile = () => {
    const { user } = useContext(AuthContext)
    const [profileUser, setProfileUser] = useState()
   

    useEffect(() => {
        fetch(`https://hellwet-soft-task-server-five.vercel.app/users?email=${user?.email}`)
            .then(res => res.json())
            .then(data => {setProfileUser(data)})
    }, [user?.email])
   

    return (
        <div className="card w-96  shadow-xl">
            <div className="avatar mx-2">
                <div className="w-24 rounded-full mx-2">
                    <img src={profileUser?.image} />
                </div>
            </div>
            <div className="card-body">
                <h2 className="card-title">Name : {profileUser?.name}</h2>
                <p>Email : {profileUser?.email}</p>
            </div>
        </div>
    );
};

export default Profile;