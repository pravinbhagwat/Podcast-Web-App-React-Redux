import React, { useState } from 'react'
import InputComponent from '../../Common/input';
import Button from '../../Common/Button';
import {
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from '../../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../../slices/userSlice';
import { toast } from 'react-toastify';

function LoginForm() {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [loading,setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        console.log("Handeling Login");
        setLoading(true);

        if(email && password){
          try{
            const userCredential = await signInWithEmailAndPassword(
              auth,
              email,
              password
            );
            const user = userCredential.user;
  
            const userDoc = await getDoc(doc(db, "users", user.uid));
            const userData = userDoc.data();
  
  
            dispatch(
              setUser({
                name: userData.name,
                email: userData.email,
                uid: userData.uid
              })
            );
  
            toast.success("Successfully Login")
            setLoading(false);
            navigate('/profile');
            
          } catch (e) {
            console.log('error',e);
            toast.error(e.message);
            setLoading(false);
          }
        } else {
          setLoading(false);
          toast.error("Make sure email and password are not empty!")
        }
    }
    
  return (
    <>
                <InputComponent 
                  state={email} 
                  type='email' 
                  setState={setEmail} 
                  placeholder='Email'
                  required={true}
                />
                <InputComponent 
                  state={password} 
                  type='password' 
                  setState={setPassword} 
                  placeholder='Password'
                  required={true}
                />

                <Button text={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading}/>
    </>
  )
}

export default LoginForm;