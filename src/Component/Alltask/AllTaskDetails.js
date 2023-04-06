import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/ContextProvider';

const AllTaskDetails = ({ taskData }) => {
    const { user } = useContext(AuthContext)
    const { date, details, title,image } = taskData
    const [showMore, setShowMore] = useState(false)

    const handleToggleShowMore = () => {
        setShowMore(!showMore);
    }


    return (
        <div className="card bg-slate-800 shadow-xl m-4  ">
            <div className="card-body  ">
                <div className="card-actions">
                        <img className='text-neutral-content rounded-full w-12' src={image} />
                        <p className="text-2xl  ">{user?.displayName}</p>
                </div>
                <h3 className='text-2xl'>{title}</h3>
                <p><small>{date}</small></p>
                <p>
                    {showMore ? details : details.slice(0, 100) + ' '}
                    {details.length > 100 && (
                        <button className="btn btn-xs bg-slate-800" onClick={handleToggleShowMore}>
                            {showMore ? 'see Less' : 'see More...'}
                        </button>
                    )}
                </p>
            </div>
        </div>
    );
};

export default AllTaskDetails;