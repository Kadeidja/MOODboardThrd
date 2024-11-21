import { createBrowserRouter } from 'react-router-dom';
//import HomeComp from '../components/homecomponent';
import HomePage from '../pages/homepage'
import LogInPage from '../pages/loginpage';
import SignInPage from '../pages/signinpage';
import LayoutPage from '../pages/layoutpage';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000'
axios.defaults.withCredentials = true

//import axios from 'axios';
//import {Toaster} from 'react-hot-toast';       <Toaster position='bottom-right' toastOptions={{duration:3000}}/>
//axios.defaults.baseURL = 'http://localhost:5000'
//axios.defaults.withCredentials = true
export const allroutersfront = createBrowserRouter([
    {
      path: '/',
      element:
      <LayoutPage />,
      children: [
    {
    index: true, 
    element: 
    <>
    <HomePage/>
    </>,
  },{
          path: '/register',
          element: <SignInPage />  },
          {
            path: '/login',
            element: <LogInPage />  },


]

},
]);