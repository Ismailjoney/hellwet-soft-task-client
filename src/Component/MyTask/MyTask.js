import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/ContextProvider';
import MyTaskDetails from './MyTaskDetails';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import Modal from '../../Shared/Modal/Modal';

const MyTask = () => {
    const { user } = useContext(AuthContext)
    const [myUpdateTasks, setMyUpdateTasks] = useState()


    const { data: myTasks = [], isLoading, refetch } = useQuery({
        queryKey: ['usersData', user?.email],
        queryFn: async () => {
            const res = await fetch(`https://hellwet-soft-task-server-five.vercel.app/usersData?email=${user?.email}`)
            const data = await res.json()
            return data;
        }
    })


    const handdleDelete = id => {
        console.log(id)
        fetch(`https://hellwet-soft-task-server-five.vercel.app/usersdata/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch()
                    toast(`delete sucessfull`)
                }
            })
    }
    
     

    return (
        <div>
            <h2 className="text-3xl font-bold">My Task</h2>
            <div>
                {
                    myTasks.length ?
                    myTasks?.map(myTask => <MyTaskDetails
                        key={myTask._id}
                        myTask={myTask}
                        handdleDelete={handdleDelete}
                        setMyUpdateTasks={setMyUpdateTasks}
                    ></MyTaskDetails>)
                    :
                    <h2 className="text-3xl flex justify-center align-items-center">You Have No Task</h2>
                }
            </div>
            {
                myUpdateTasks &&
                <Modal
                    myUpdateTasks={myUpdateTasks}
                    setMyUpdateTasks={setMyUpdateTasks}
                    refetch={refetch}
                ></Modal>
            }
        </div>
    );
};

export default MyTask;