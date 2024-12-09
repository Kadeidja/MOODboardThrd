import './styles/styles.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import HomePage from '../src/pages/homepage'
import LogInPage from '../src/pages/loginpage';
import NavbarComp from '../src/components/navbarcomponent';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
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
      <Route path='/signin' element={<SignInComp/>}/>
      <Route path='/login' element={<LogInPage/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
