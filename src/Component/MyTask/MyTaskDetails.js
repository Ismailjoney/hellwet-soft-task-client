import React from 'react';


const MyTaskDetails = ({ myTask,handdleDelete,   setMyUpdateTasks }) => {
    const { title, details, date, _id} = myTask
 
    return (
        <div className="card   shadow-xl image-full mt-2">
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p><small>{date}</small></p>
                <p>{details}</p>
                <div className="card-actions justify-end">
                    <button onClick={() => handdleDelete(_id)} className="btn btn-outline ">delete</button>
                    < label onClick={() =>  setMyUpdateTasks(_id)} htmlFor="ModalUpdate" className="btn btn-outline " >Edit</label >
                </div>
            </div>
        </div>
    );
};

export default MyTaskDetails;