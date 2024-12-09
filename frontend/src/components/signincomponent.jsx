//IMPORTS
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import userIcon from '../assets/usericon.svg';
import keyIcon from '../assets/keylock.svg';
import { TheReButtonLink } from './reusablecomponent';


export default function SignInComp(){
const navigation = useNavigate();

const [dataSubscription,setDataSubscription] = useState({
    name: '',
    email:'',
    password: '',
});

const SubscriptionUser = async (e) => {
    e.preventDefault();
    console.log("Data being sent:", dataSubscription);//ok
    try {
         const dataResponse = await axios.post('http://localhost:5000/signin', {
            ulname: dataSubscription.name, 
            ulemail: dataSubscription.email, 
            ulpswd: dataSubscription.password}
        );
    //VALIDATION 
    console.log("Server response:", dataResponse);
    toast.success(dataResponse.data.message);//ok
    setDataSubscription({ name: '', email: '', password: '' });
    navigation('/login');
    } catch (error) {
        console.log("ERROR TYPE: " + error)
        if (error.response) {
            // Erreur avec une réponse du serveur
            const serverError = error.response.data?.error || 'Server error.';
            toast.error(serverError, { position: 'bottom-left' });
        }
    }
};
    return(
        <>
<div className="boxDivClass divLogIn">
    <div className="titleSpaceClass">
    <h1> Registration </h1>
    </div>
    <div className="connexionSpaceClass">
        <form onSubmit={SubscriptionUser}>
        <label id="userNameLogInId" className="labelClass" htmlFor="loginuserName">Name
        </label>
        <div className="inputSpaceClass">
       <img
          className="loginIcon"
          src={userIcon}
          alt="icon"/>
          <input id="loginuserName" name="loginnameinput" type="text" className="inputcssClass" placeholder="Veuillez entrer votre nom" value={dataSubscription.name} onChange={(e)=>setDataSubscription({...dataSubscription, name: e.target.value})}/>
        
        <br/>
        <div id='inputNameError'>
            <p></p>
        </div>
        </div>

        <label id="userMailLogInId" className="labelClass" htmlFor="userMail">Mail</label>
        <div className="inputSpaceClass">        
    <img
          className="loginIcon"
          src={keyIcon}
          alt="icon"/>
          <input id="userMail" name="loginmailinput" type="email" className="inputcssClass" placeholder="Entrez votre e-mail"  value={dataSubscription.email} onChange={(e)=>setDataSubscription({...dataSubscription, email: e.target.value})}/>
        <br/>
        <div id='inputEmailError'>
            <p></p>
        </div>
        </div>

        <label id="userPswdLogInId" className="labelClass" htmlFor="userPswd">Mot de passe</label>
            <div className="inputSpaceClass">        
            <img
          className="loginIcon"
          src={keyIcon}
          alt="icon"/>
                <input id="userPswd" name="loginpswdinput" type="password" className="inputcssClass" placeholder="Entrez votre mot de passe" value={dataSubscription.password} onChange={(e)=>setDataSubscription({...dataSubscription, password: e.target.value})}/>
            <br/>
            <div id='inputPswdError'>
            <p></p>
        </div>
        </div>
<div className='btnSpaceClass'>
        <div className='soloBtnSpaceClass'>
            <label id='userSubscriptionLogInId' className="labelClass" htmlFor='userSubscription'>
                <input id='userSubscription' name='loginSubscriptioninput' type='submit' className="buttoncssClass"  value='REGISTER'/>
            </label>
        </div>

        

        
        <div>
            <p>You already have an account ?</p>
            {TheReButtonLink({labelId:'userLogInId',btnValue:'LOG IN',btnId:'userLogInbtnId',btnName:'loginBtninput',linksrc:'login'})}

        </div>       
       
</div>
        </form>
</div>
</div>

</>
    )
}