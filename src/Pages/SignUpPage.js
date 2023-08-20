import React, { useState } from "react";
import Header from "../Components/Common/Header";
import SignUpForm from "../Components/SignUpComponent/SignUpForm";
import LoginForm from "../Components/SignUpComponent/LoginForm";

function SignUpPage(){

    const [flag,setFlag] = useState(false);

    return(
        <div>
            <Header/>
            <div className="input-container">
              <div className="input-wrapper">
                {!flag ? <h1>SignUp</h1> : <h1>Login</h1>}
                {!flag ? <SignUpForm/> : <LoginForm />}
                {!flag ? (
                    <p onClick={() => setFlag(!flag)}>Already have an Account? Click here to Login.</p> 
                ) : (
                    <p onClick={() => setFlag(!flag)}>Dont't have an account? Click here to Signup.</p>
                )}
              </div>
            </div>

        </div>
    )
}

export default SignUpPage;