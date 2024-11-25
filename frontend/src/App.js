//import logo from './logo.svg';
import './styles/styles.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
//import HomeComp from '../components/homecomponent';
import HomePage from '../src/pages/homepage'
import LogInPage from '../src/pages/loginpage';
import SignInPage from '../src/pages/signinpage';
import NavbarComp from '../src/components/navbarcomponent';
//import LayoutPage from '../pages/layoutpage';
import axios from 'axios';
import toast , { Toaster } from 'react-hot-toast';
import SignInComp from './components/signincomponent';

axios.defaults.baseURL = 'http://localhost:5000'
axios.defaults.withCredentials = true
function App() {
  return (
    <>
    <BrowserRouter>
    <NavbarComp/>
    <Toaster position='bottom-left' toastOptions={{duration: 3000}}/>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/login' element={<LogInPage/>}/>
      <Route path='/signin' element={<SignInComp/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
