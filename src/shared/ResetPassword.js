import { ERROR_MESSAGES } from "../contsants/errormessages";
import amazonlogo from '../images/amazon-logo.png';
import { IsEmailValid } from "../Utilities/Utils";
import { resetPasswordApi } from "../services/authservice";
import { useState } from "react";



function ResetPassword() {

    let[email,setEmail] = useState({email: ''});
    let[errors, setErrors] = useState({email: 'false', apiError: 'false'});
    let [apiMsg, setApiMsg] = useState("");

    const updateEmail = (e) => {
        setEmail({...email, email: e.target.value})
    }

     const handleResetPassword = async() => {
        let tempErrors = {email: 'false', apiError: 'false'};
        let hasError = false;

        if(IsEmailValid(email.email) === false) {  
            hasError = true;
            tempErrors.email = true;
          }
          else{        
             tempErrors.email = false;
          }

          
          setErrors(tempErrors)

          if(hasError === false)
          {        //call reset password api
            try {
                let response = await resetPasswordApi({email: email.email})
                setErrors({email: false, apiError: false})
                console.log(response.data.result)       
                    if(response.data.result === "success") {
                        setApiMsg(response.data.message)
                    }
                }
            catch (error) {
                    console.log("Error occurred while resetting password:", error)
                    setErrors({email: false, apiError: true})
                    setApiMsg("")
                         }

        }
    }

        return (
            <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-4">
                                <div className='text-center'>
                                    <img src={amazonlogo} className="logo-img" />
                                </div>
                                <div className="card">
                                    <div className="card-body">
                                        <h3>ResetPassword</h3>
                                        
                                        <div className='mt-3'>
                                            <strong>Email</strong>
                                            <input type="email" className='form-control' placeholder='Email' onChange={updateEmail} />
                                            <div className='text-danger'>{errors.email === true && ERROR_MESSAGES.INVALID_EMAIL}</div>
                                        </div>                                      
                                        
                                        <div className='mt-4 grid'>
                                           <button className="btn btn-primary" onClick={(e) => handleResetPassword(e)}>ResetPassword</button>
                                             <div className='text-danger'> {errors.apiError === true && ERROR_MESSAGES.RESET_PASSWORD_FAILED}</div>
                                             <div className='text-success'>{apiMsg}</div>
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
                  
                          
                        </div>

        )

}
export default ResetPassword;