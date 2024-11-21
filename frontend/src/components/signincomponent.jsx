//IMPORTS
import { useState } from 'react';
import userIcon from '../assets/usericon.svg'
import keyIcon from '../assets/keylock.svg'
import axios from 'axios';
import {toast} from 'react-hot-toast';
//import { useNavigate } from 'react-router-dom';
import { TheReButtonLink,TheReButtonSubmit } from './reusablecomponent';


export default function SignInComp(){
    //const navigation = useNavigate()

const [dataSubscription,setDataSubscription] = useState({
    name: '',
    email:'',
    password: '',
})
const subscriptionUser = async (e) => {
    e.preventDefault();
    const {name, email, password} = dataSubscription
    try {
        const {dataSubscription} = await axios.post('/signin', {
            name, email, password
        })

        if(dataSubscription.error){
            toast.error(dataSubscription.error)
        } else {
            setDataSubscription({})
            toast.success('Logged Up!!!')
            //navigation('/login')
        }
    } catch (error) {
        console.log(error)
    }
}
    return(
        <>
<div className="boxDivClass divLogIn">
    <div className="titleSpaceClass">
    <h1> Subscription </h1>
    </div>
    <div className="connexionSpaceClass">
        <form onSubmit={subscriptionUser}>
        <label id="userNameLogInId" className="labelClass" htmlFor="loginuserName">Name
        </label>
        <div className="inputSpaceClass">
       <img
          className="loginIcon"
          src={userIcon}
          alt="icon"/>
          <input id="loginuserName" name="loginnameinput" type="text" className="inputcssClass" placeholder="Veuillez entrer votre nom" value={dataSubscription.name} onChange={(e)=>setDataSubscription({...dataSubscription, name: e.target.value})}/>
        
        <br/>
        </div>

        <label id="userMailLogInId" className="labelClass" htmlFor="userMail">Mail</label>
        <div className="inputSpaceClass">        
    <img
          className="loginIcon"
          src={keyIcon}
          alt="icon"/>
          <input id="userMail" name="loginmailinput" type="email" className="inputcssClass" placeholder="Entrez votre e-mail"  value={dataSubscription.email} onChange={(e)=>setDataSubscription({...dataSubscription, email: e.target.value})}/>
        <br/>
        </div>

        <label id="userPswdLogInId" className="labelClass" htmlFor="userPswd">Mot de passe</label>
            <div className="inputSpaceClass">        
            <img
          className="loginIcon"
          src={keyIcon}
          alt="icon"/>
                <input id="userPswd" name="loginpswdinput" type="password" className="inputcssClass" placeholder="Entrez votre mot de passe" value={dataSubscription.password} onChange={(e)=>setDataSubscription({...dataSubscription, password: e.target.value})}/>
            <br/>
        </div>

        <div className='btnSpaceClass'>

{TheReButtonSubmit({labelId:'userSubscriptionLogInId',btnValue:'REGISTER',btnId:'userSubscription',btnName:'loginSubscriptioninput'})}
        
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