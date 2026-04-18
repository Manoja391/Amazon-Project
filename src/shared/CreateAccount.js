import amazonlogo from '../images/amazon-logo.png';
import { useState } from "react";
import { IsEmailValid } from '../Utilities/Utils';
import { ERROR_MESSAGES } from '../contsants/errormessages';
import {signupAPi } from '../services/authservice';
import { CheckUserLoginStatus } from "../Utilities/Utils";


function Signup()
{
    let IsUserloggedIn = CheckUserLoginStatus();
    
    if(IsUserloggedIn == true) {
        window.location.href="/"
    }

    const[signupData, setSignupData] = useState({name: '', email: '', password: ''})
    const[signupErrors, setsignupErrors] = useState({name: 'false', email: 'false', password: 'false'})
    
    const updateName = (e) => {
        console.log(e.target.value);
        setSignupData({...signupData, name: e.target.value})
    }

    const updateEmail = (e) => {
        setSignupData({...signupData, email: e.target.value})
    }

    const updatePassword = (e) => {
        setSignupData({...signupData, password: e.target.value})
    }

    const handleSignUp = async () => {
        // Handle sign-up logic here
        //console.log("Sign-up data:", signupData);
        let tempErrors = {...signupErrors}

        let hasError = false;

       if(signupData.name.length<3) {
          hasError = true;
          tempErrors = {...tempErrors, name:true}
        }
        else{
          tempErrors = {...tempErrors, name:false}
        }

        if(IsEmailValid(signupData.email)=== false) {
            hasError = true;
            tempErrors = {...tempErrors, email:true}
        }
        else{
            tempErrors = {...tempErrors, email:false}
        }

        if(signupData.password.length<6) {
            hasError = true;
            tempErrors = {...tempErrors, password:true}

        }
        else{
            tempErrors = {...tempErrors, password:false}
        }

        setsignupErrors(tempErrors);

        if(!hasError) {
            // Proceed with sign-up logic
            //call api to create account
            //method: POST
            //endpoint: '/api/std/create-account'
            //body: {name: signupData.name, email: signupData.email, password: signupData.password}

           let res= await signupAPi({...signupData})
            console.log(res)

            if(res.data.result === "success") {
                localStorage.setItem("UserData",JSON.stringify(res.data.data))
                window.location.href="/"
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
                            <h3>Create Account</h3>
                            <div className='mt-3'>
                                <strong>Name</strong>
                                <input type="text" className='form-control' placeholder='Your Full Name'  onChange={ e => updateName(e)} ></input>
                                <div className='text-danger'>{signupErrors.name===true && ERROR_MESSAGES.SHORT_NAME}</div>
                            </div>
                            <div className='mt-3'>
                                <strong>Email</strong>
                                <input type="text" className='form-control' placeholder='Email' onChange={e => updateEmail(e)}  ></input>
                                <div className='text-danger'>{signupErrors.email===true && ERROR_MESSAGES.INVALID_EMAIL}</div>
                            </div>
                            <div className='mt-3'>
                                <strong>Password</strong>
                                <input type="password" className='form-control' placeholder='password' onChange={e => updatePassword(e)} ></input>
                                <div className='text-danger'>{signupErrors.password===true && ERROR_MESSAGES.SHORT_PASSWORD}</div>
                            </div>
                            <div className='mt-4'>
                                <p>To verify your number, we will send you text messages with a temp code.</p>
                            </div>
                            <div className='mt-4 grid'>
                                <button className="btn btn-success" onClick={handleSignUp}>Create Account</button>
                             </div>
                        </div>

                        <div className="card-footer">
                            <div className='mt-3'>
                                <strong>Buying for Work?</strong>
                                <div><a href='#' >Create a free business account</a></div>
                            </div>
                            <div className='mt-3'>

                                <div><span className="fs-6">Already have an account</span><a className='ms-2' href='#'>Sign In</a></div>
                                
                            </div>
                            <div className='mt-3'>
                                <p>By Creating an Account or logging in You 
                                    are agree to Amazon's <a href='#'>Conditions</a>
                                </p>

                            </div>
                        </div>

                    </div>
                </div>
             </div>

             <div className='row justify-content-center'>
                <div  className="col-4 text-center">
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
        </div>       
    )
}

export default Signup;