import searchbar from '../assets/searchicon.svg';
import usericon from '../assets/usericon.svg';
import { Link } from "react-router-dom";
import LogoComp from './logocomponent';

export default function NavbarComp(){
    return(
        <>
        <nav id="navId">
            <div id='navLogoDivId'> <LogoComp/> </div>
            <div id="navUserNameDivId" className='navbarelemclass'><Link to="/home">UserName</Link></div>
            <div id="navSearchBarDivId" className='navbarelemclass navbariconpic'><Link to=""><img src={searchbar} alt='Search bar'/></Link></div>
            <div id="navBtnProfilDivId" className='navbarelemclass navbariconpic'><Link to=""><img src={usericon} alt='Your Profile' /></Link></div>
            <div id="navBtnSigninDivId" className='navbarelemclass navbariconpic'><Link to="/signin"><img src={usericon} alt='Your Profile' />Sign In</Link></div>
            <div id="navBtnLoginDivId" className='navbarelemclass navbariconpic'><Link to="/login"><img src={usericon} alt='Your Profile' />Log In</Link></div>
        </nav>
        </>
    );
};