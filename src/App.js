 
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './Route/Route';
import   { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div  className='bg-indigo-950'>
       <RouterProvider router={router} ></RouterProvider>
        <Toaster></Toaster>
    </div>
  );
}

export default App;
