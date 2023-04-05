import React, { useContext } from 'react';
import Header from '../Shared/Header/Header';
import { Link, Outlet } from 'react-router-dom';
import { BeakerIcon, PlusIcon } from '@heroicons/react/24/solid'
import { AuthContext } from '../context/ContextProvider';

const Mainlayout = () => {
    const { user, logOut } = useContext(AuthContext)
    // const menu = <>
    //     <li><Link to=''>My Task</Link></li>
    //     <li><Link to=''>Add Task</Link></li>
    // </>

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
                <div className="drawer-content flex  ">
                    <Outlet></Outlet>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                        <li><Link to='/alltask'>All Task</Link></li>
                        <li><Link to='/profile'>Profile</Link></li>
                        <li><Link to='/addtask'>Add Task</Link></li>
                        <li><Link to='/mytask'>My Task</Link></li>

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




