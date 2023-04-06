import React, { useEffect, useState } from 'react';
import AllTaskDetails from './AllTaskDetails';

const AllTask = () => {
    const[allTaskData, setAllTaskData] = useState()

    useEffect(() =>{
        fetch('http://localhost:5000/usersData')
        .then(res => res.json())
        .then(data => setAllTaskData(data))
    },[])
 


    return (
        <div className='mx-4'>
            <h2 className="text-3xl font-bold">All Task</h2>
            <div >
                {
                   allTaskData?.map(taskData => <AllTaskDetails
                   key={taskData._id}
                   taskData={taskData}
                   ></AllTaskDetails>) 
                }
            </div>
        </div>
    );
};

export default AllTask;