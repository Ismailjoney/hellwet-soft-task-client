import React, { useContext } from 'react';
import Header from '../Shared/Header/Header';
import { Link, Outlet } from 'react-router-dom';
import { UserIcon, PlusIcon, PencilIcon, HomeIcon } from '@heroicons/react/24/solid'
import { AuthContext } from '../context/ContextProvider';

const Mainlayout = () => {
    const { user, logOut } = useContext(AuthContext)


    const handdleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(err => console.log(err))
    }


    return (
        <div>
            <Header></Header>
            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content ">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side bg-indigo-950">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80  text-base-content">
                        {
                            user?.email && <>
                                <li><Link to='/profile'><UserIcon className='w-6 h-6 font-bold text-white' />  Profile</Link></li>
                                <li><Link to='/addtask'><PlusIcon className='w-6 h-6 font-bold text-white' />
                                    Add Task</Link></li>
                                <li><Link to='/mytask'> <PencilIcon className='w-6 h-6 font-bold text-white' />My Task</Link></li>
                            </>


                        }
                        <li><Link to='/alltask'><HomeIcon className='w-6 h-6 font-bold text-white' />  All Task</Link></li>

                        <div className='mt-2'>
                            <div className="divider"></div>
                            {
                                user?.email ?
                                    <button onClick={handdleLogOut}>Log Out </button>
                                    :
                                    <button>
                                        <Link to='/login'>Log In</Link>
                                    </button>
                            }
                        </div>
                    </ul>
                </div>
            </div>

        </div >
    );
};

export default Mainlayout;




