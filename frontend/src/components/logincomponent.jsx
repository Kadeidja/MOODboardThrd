import { useState } from 'react';

//import userIcon from '../assets/usericon.svg'
import keyIcon from '../assets/keylock.svg'
import axios from 'axios';

export default function LogInComp(){
const [dataLogin,setDataLogin] = useState({
    email:'',
    password: '',
})
const loginUser = (e) =>{
    e.preventDefault()
    axios.get('/')
    
}
return(
<>
<div className="boxDivClass divLogIn">
    <div className="titleSpaceClass">
    <h1> LogIn In </h1>
    </div>
    <div className="connexionSpaceClass">
        <form onSubmit={loginUser}>
        <label id="userMailLogInId" className="labelClass" htmlFor="userMail">Mail</label>
        <div className="inputSpaceClass">        
    <img
          className="loginIcon"
          src={keyIcon}
          alt="icon"/>
          <input id="userMail" name="loginmailinput" type="email" className="inputcssClass" placeholder="Entrez votre e-mail" value={dataLogin.email} onChange={(e)=>setDataLogin({...dataLogin, email: e.target.value})}/>
        <br/>
        </div>

        <label id="userPswdLogInId" className="labelClass" htmlFor="userPswd">Mot de passe</label>
            <div className="inputSpaceClass">        
            <img
          className="loginIcon"
          src={keyIcon}
          alt="icon"/>
                <input id="userPswd" name="loginpswdinput" type="password" className="inputcssClass" placeholder="Entrez votre mot de passe" value={dataLogin.password} onChange={(e)=>setDataLogin({...dataLogin, password: e.target.value})}/>
            <br/>
        </div>

<div className='btnSpaceClass'>

        <div className='soloBtnSpaceClass'>
            <label id="userSubmitLogInId" className="labelClass" htmlFor="userSubmit">
                <input id="userSubmit" name="loginSubmitinput" type="submit" className="buttoncssClass loginBtn"  value="Soumettre"/>
            </label>
        </div>
</div>
        </form>
</div>
</div>

</>
)
}