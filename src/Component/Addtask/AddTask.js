import { format } from 'date-fns';
import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
// import { AuthContext } from '../../context/ContextProvider';
 

const AddTask = () => {
    // const {user} = useContext(AuthContext)
    // console.log(user)
    const data = new Date()
    const date = format(data, 'PP')
 
    const handdleData = event => {
         event.preventDefault()

        const form = event.target;
        const title = form.title.value
        const  details = form.details.value;

        const  usersPostData = {
            title,
            details,   
            date: date
        }

        console.log(usersPostData)


        fetch('http://localhost:5000/usersdata', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(usersPostData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
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
                <form onSubmit={handdleData} className='w-full md:w-96 bg-gray-800 p-8 shadow-2xl mx-2 md:mx-10 flex  flex-col justify-center'  >
                    <div className=' relative flex flex-col justify-center '>
                        <p className='font-semibold text-sm mt-2 text-white'>Tittle</p>
                        <input required name='title' className='my-2 p-2 rounded text-gray-900 font-semibold shadow-md' type="text" placeholder='Add a Title'/>
                        <p className='font-semibold text-sm mt-2 text-white'>Details</p>
                        <textarea name='details'   className='my-2 p-2 text-gray-900 font-semibold rounded shadow-md' id="" placeholder='Add Some Details'></textarea>
                        <button type='submit' className='px-4 py-2 my-2 bg-blue-600 text-white rounded'>Add</button>
                    </div>


                </form>
            </div>
        </div>
    );
};

export default AddTask;