//REUSABLE COMPONENTS
import { Link } from "react-router-dom";

//BOXE
function TheReBox({boxTitle,idTitle,subComponent}){
    return(
        <div id={idTitle} className="boxDivClass" color="blue">
        <h1 className="boxBgTtl">{boxTitle}</h1>
        <div className="subComponent">
            {subComponent} 
        </div>
        </div>
    );
    
};

//INPUT
function TheReInput({inputIcon,inputAltIcon,inputId,inputName,inputType,inputClass,inputPlaceholder}){
    return(
        <div className="inputSpaceClass">
       <img
          className="loginIcon"
          src={inputIcon}
          alt={inputAltIcon}/>
          <input id={inputId} name={inputName} type={inputType} className={inputClass} placeholder={inputPlaceholder}/>
        <br/>
        </div>
    )
}

//BUTTON SUBMIT
function TheReButtonSubmit({labelId,btnValue,btnId,btnName}){
    return(
        <div className='soloBtnSpaceClass'>
            <label id={labelId} className="labelClass" htmlFor={btnId}>
                <input id={btnId} name={btnName} type='submit' className="buttoncssClass"  value={btnValue}/>
            </label>
        </div>
    )
}
function TheReButtonLink({labelId,btnValue,btnId,btnName,linksrc}){
    return(
        <div className='soloBtnSpaceClass'>
            <Link to={`/`+linksrc}>
            <label id={labelId} className="labelClass" htmlFor={btnId}>
                <input id={btnId} name={btnName} type='' className="buttoncssClass"  value={btnValue}/>
            </label>
            </Link>
        </div>
    )
}






export {TheReBox,
    TheReButtonSubmit,
    TheReButtonLink,
    TheReInput
};