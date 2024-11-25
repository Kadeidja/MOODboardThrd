//IMPORTS
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Await, useNavigate } from 'react-router-dom';
import userIcon from '../assets/usericon.svg';
import keyIcon from '../assets/keylock.svg';
import { TheReButtonLink,TheReButtonSubmit } from './reusablecomponent';

//const notify = () => toast({error});


export default function SignInComp(){
const navigation = useNavigate('');

const [dataSubscription,setDataSubscription] = useState({
    name: '',
    email:'',
    password: '',
});
const subscriptionUser = async (e) => {
    e.preventDefault();
    const {name, email, password} = dataSubscription
    //const { ename, eemail, epassword} = errorDataSubscription
               // {TheReButtonSubmit({labelId:'userSubscriptionLogInId',btnValue:'REGISTER',btnId:'userSubscription',btnName:'loginSubscriptioninput'})}

    try {
        const {dataSubscription} = await axios.post('/signin', {
            name, email, password,
        }
    )
        if (dataSubscription.error){
            toast.error(dataSubscription.error, {position:'bottom-left'})

        } else {
            setDataSubscription({})
            toast.success('Sign In Succesfully!!!')
            navigation('/login')
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
          <input id="loginuserName" name="loginnameinput" type="text" className="inputcssClass" placeholder="Veuillez entrer votre nom" defaultValue={dataSubscription.name} onChange={(e)=>setDataSubscription({...dataSubscription, name: e.target.value})}/>
        
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
          <input id="userMail" name="loginmailinput" type="email" className="inputcssClass" placeholder="Entrez votre e-mail"  defaultValue={dataSubscription.email} onChange={(e)=>setDataSubscription({...dataSubscription, email: e.target.value})}/>
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
                <input id="userPswd" name="loginpswdinput" type="password" className="inputcssClass" placeholder="Entrez votre mot de passe" defaultValue={dataSubscription.password} onChange={(e)=>setDataSubscription({...dataSubscription, password: e.target.value})}/>
            <br/>
            <div id='inputPswdError'>
            <p></p>
        </div>
        </div>
<div className='btnSpaceClass'>
        <div className='soloBtnSpaceClass'>
            <label id='userSubscriptionLogInId' className="labelClass" htmlFor='userSubscription'>
                <input id='userSubscription' name='loginSubscriptioninput' type='submit' className="buttoncssClass"  defaultValue='REGISTER'/>
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