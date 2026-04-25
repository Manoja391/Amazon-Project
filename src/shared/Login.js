import { useState } from "react";
import { ERROR_MESSAGES } from "../contsants/errormessages";
import amazonlogo from '../images/amazon-logo.png';
import { IsEmailValid } from "../Utilities/Utils";
import { signinAPi } from "../services/authservice";
import { CheckUserLoginStatus } from "../Utilities/Utils";
import { Link } from "react-router-dom";

function Login()
{

let IsUserloggedIn = CheckUserLoginStatus();
        
    if(IsUserloggedIn == true) {
        window.location.href="/"
    }

let[modalClasses, setModalClasses] = useState("modal dis-none");
let isModalOpen = false;

let [loginData, setloginData] = useState({email:'', password: ''});
let [loginErrors, setLoginErrors] = useState({email: 'false', password: 'false', apiError: 'false'});


const updateEmail = (e) => {
    setloginData({...loginData, email: e.target.value})
}

const updatePassword = (e) => {
    setloginData({...loginData, password: e.target.value})
}   


const handleLoginBtn = async() => {
    let tempErrors = {...loginErrors}
    let hasError = false;

    if(IsEmailValid(loginData.email)=== false) {
        hasError = true;
        tempErrors = {...tempErrors, email:true}
      }
      else{
        tempErrors = {...tempErrors, email:false}
      }

      if(loginData.password.length<6) {
        hasError = true;
        tempErrors = {...tempErrors, password:true}
        }
        else{
            tempErrors = {...tempErrors, password:false}
        }

    setLoginErrors(tempErrors)
    
    if(hasError == false)
    {
        //call login api
          //method: POST
        //endpoint: '/api/std/login'
        //body: {email: loginData.email, password: loginData.password}
                try {
                   let res= await signinAPi({...loginData})
                    console.log(res)
                    setLoginErrors({...loginErrors, apiError: false})
                    if(res.data.result === "success") {
                        localStorage.setItem("UserData",JSON.stringify(res.data.data))
                        window.location.href="/"
                    }
                } 
                catch (error) {
                    setLoginErrors({...loginErrors, apiError: true})
                    console.log(error)
                }
    }
}
    return(
         <div className="container">
            <div className="row justify-content-center">
                <div className="col-4">
                    <div className='text-center'>
                        <img src={amazonlogo} className="logo-img" />
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <h3>Login</h3>
                            
                            <div className='mt-3'>
                                <strong>Email</strong>
                                <input type="text" className='form-control' placeholder='Email' onChange={updateEmail} />
                                <div className='text-danger'>{loginErrors.email==true && ERROR_MESSAGES.INVALID_EMAIL}</div>
                            </div>
                            <div className='mt-3'>
                                <strong>Password</strong>
                                <input type="password" className='form-control' placeholder='password' onChange={updatePassword} />
                                <div className='text-danger'>{loginErrors.password==true && ERROR_MESSAGES.SHORT_PASSWORD}</div>
                                <div><Link to='/ResetPassword'>Forgot Password?</Link></div>
                            </div>
                            <div className='mt-4'>
                                <p>To verify your number, we will send you text messages with a temp code.</p>
                            </div>
                            <div className='mt-4 grid'>
                               <button className="btn btn-primary" onClick={() => handleLoginBtn()}>Login</button>
                                 <div className='text-danger'>{loginErrors.apiError==true && ERROR_MESSAGES.LOGIN_FAILED}</div>
                            </div>
                        </div>

                       

                    </div>
                </div>
            </div>

            <div className='row justify-content-center'>
                <div className="col-4 text-center">
                    <div className='row'>
                        <div className='col-4'><a href='#'>Conditions of Use</a></div>
                        <div className='col-4'><a href='#'>Privacy Policy</a></div>
                        <div className='col-4'><a href='#'>Help</a></div>

                    </div>
                    <div className='mt-3'>
                        &copy;1996-2024,Amazon.com Inc or its affliates
                    </div>
                </div>
            </div>
      
                <div className={modalClasses}>

                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Modal title</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => handleLoginBtn()}></button>
                            </div>
                            <div className="modal-body">
                                <p>Modal body text goes here.</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
    )
}

export default Login;