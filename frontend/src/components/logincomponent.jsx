import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import keyIcon from '../assets/keylock.svg'
import axios from 'axios';

export default function LogInComp(){
    const navigation = useNavigate('');

    const [dataLogin,setDataLogin] = useState({
    email:'',
    password: '',
})
const loginUser = async (e) =>{
    e.preventDefault();
    try {
        const foundedData = await axios.post('/login',
            {ulemail: dataLogin.email, 
            ulpswd: dataLogin.password},
            { headers: { 'Content-Type': 'application/json' }},        
);
console.log("Server response:", foundedData);
toast.success('Sign Up Succesfully!!!')
    setDataLogin({})
    navigation('/')

} catch (error) {
    console.log("ERROR TYPE: " + error)
    if(error.response){
    const serverError = error.response.data?.error || 'Error Server.';
    toast.error(serverError, {position:'bottom-left'});
    }
} 
    
};
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
                <input id="userSubmit" name="loginSubmitinput" type="submit" className="buttoncssClass loginBtn"  value='SUBMIT'/>
            </label>
        </div>
</div>
        </form>
</div>
</div>

</>
)
}