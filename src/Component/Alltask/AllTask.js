import React, { useEffect, useState } from 'react';
import AllTaskDetails from './AllTaskDetails';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Shared/Loading/Loading';

const AllTask = () => {
    const { data: allTaskData = [], isLoading, refetch } = useQuery({
        queryKey: ['usersData'],
        queryFn: async () => {
            const res = await fetch(`https://hellwet-soft-task-server-five.vercel.app/usersData`)
            const data = await res.json()
            return data;
        }
    })

    if(isLoading){
         return <Loading></Loading>
    }
 
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