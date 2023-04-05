import { Bars3Icon } from '@heroicons/react/24/solid';
import React from 'react';

const Header = () => {
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <a className="btn btn-ghost normal-case text-xl">Task Maneger</a>
            </div>
            <div>
            <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
                <Bars3Icon className='w-4 h-4'></Bars3Icon>
            </label>
            </div>
        </div>
         
    );
};

export default Header;