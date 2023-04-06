import { format } from 'date-fns';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../context/ContextProvider';
 

const AddTask = () => {
    const {user} = useContext(AuthContext)
    const [userInfo, setUserInfo] = useState()
    const data = new Date()
    const date = format(data, 'PP')

    useEffect(() =>{
        fetch(`http://localhost:5000/users?email=${user?.email}`)
        .then(res => res.json())
        .then(data =>  setUserInfo(data))
    },[user?.email])

  
 
    const handdleData = event => {
         event.preventDefault()

        const form = event.target;
        const title = form.title.value
        const  details = form.details.value;

        const  usersPostData = {
            title,
            details,   
            date: date,
            email : user?.email,
            name : user?.displayName,
            image: userInfo?.image
        }
 

        fetch('http://localhost:5000/usersdata', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(usersPostData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                     toast("Add Service Sucessfull",{
                            position: "top-center",
                        })          
                }
                form.reset()                
            })
    }


    return (
        <div>
            <h2 className="text-3xl font-bold my-2">Add Task</h2>
            <div>
                <form onSubmit={handdleData} className='md:w-96 bg-slate-800 p-8 shadow-2xl mx-2 md:mx-10 flex  flex-col justify-center'  >
                    <div className=' relative flex flex-col justify-center '>
                        <p className='font-semibold text-sm mt-2 text-white'>Tittle</p>
                        <input  name='title' className='my-2 p-2 rounded   font-semibold shadow-md' type="text" placeholder='Add a Title' required/>
                        <p className='font-semibold text-sm mt-2 text-white'>Details</p>
                        <textarea name='details'   className='my-2 p-2   h-60  font-semibold rounded shadow-md' id="" placeholder='Add Some Details' required></textarea>
                        <button type='submit' className='px-4 py-2 my-2 bg-blue-600 text-white rounded'>Add</button>
                    </div>


                </form>
            </div>
        </div>
    );
};

export default AddTask;