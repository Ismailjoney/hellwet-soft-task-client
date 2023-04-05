import { createBrowserRouter } from "react-router-dom";
import Home from "../page/Home/Home";
import Mainlayout from "../layout/Mainlayout";
import LogIn from "../page/LogIn/LogIn";
import AddTask from "../Component/Addtask/AddTask";
import MyTask from "../Component/MyTask/MyTask";
import Profile from "../Component/Profile/Profile";
import Reg from "../page/Reg/Reg";
import PrivetRoute from "./PrivetRoute/PrivetRoute";
import AllTask from "../Component/Alltask/AllTask";
 

export const router = createBrowserRouter([
    {
        path:'/',
        element:   <Mainlayout></Mainlayout> ,
        children : [
            {
                path: '/',
                element : <Home></Home>
            },
            {
                path: '/alltask',
                element : <AllTask></AllTask>
            },
            {
                path: '/login',
                element:<LogIn></LogIn>
            },
            {
                path: '/reg',
                element:<Reg></Reg>
            },
            {
                path: '/addtask',
                element : <PrivetRoute><AddTask></AddTask></PrivetRoute>
            },
            {
                path: '/mytask',
                element : <PrivetRoute><MyTask></MyTask></PrivetRoute>
            },
            {
                path: '/profile',
                element : <PrivetRoute><Profile></Profile></PrivetRoute>
            },
           
        ]
    }
    // {
    //     path:'/home',
    //     element : <Home></Home>,
    //     children: [
    //         {
    //             path: '/home',
    //             element:<LogIn></LogIn>
    //         },
    //         {
    //             path: '/home/reg',
    //             element:<Reg></Reg>
    //         },
    //     ]

    // }
])