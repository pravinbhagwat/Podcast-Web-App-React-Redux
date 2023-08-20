import React, { useState } from "react";
import InputComponent from "../../Common/input";
import Button from "../../Common/Button";
import { auth, db, storage } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUser } from "../../../slices/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function SignUpForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignUp = async () => {
    console.log("Handeling SignUp");
    setLoading(true);
    if (
      password == confirmPassword &&
      password.length >= 6 &&
      fullName &&
      email
    ) {
      try {
        // creating user's account.
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        console.log("user", user);

        //saving user's details.
        await setDoc(doc(db, "users", user.uid), {
          name: fullName,
          email: user.email,
          uid: user.uid,
        });

        // Save data in the redux, call the redux action.
        dispatch(
          setUser({
            name: fullName,
            email: user.email,
            uid: user.uid,
          })
        );

        toast.success("User has been Created!");
        setLoading(false);
        navigate("/profile");
      } catch (e) {
        console.log("error", e);
        toast.error(e.message);
        setLoading(false);
      }
    } else {
      //throw error
      if (password != confirmPassword) {
        toast.error(
          "Please Make Sure your Password and Confirm Password matches!"
        );
      } else if (!fullName) {
        toast.error("Please Enter your Full Name");
      } else if (!email) {
        toast.error("Please Enter your email");
      } else if (password.length < 6) {
        toast.error("Please Make Sure your Password is more than 6 digits");
      }
      setLoading(false);
    }
  };

  return (
    <>
      <InputComponent
        state={fullName}
        type="text"
        setState={setFullName}
        placeholder="Full Name"
        required={true}
      />
      <InputComponent
        state={email}
        type="email"
        setState={setEmail}
        placeholder="Email"
        required={true}
      />
      <InputComponent
        state={password}
        type="password"
        setState={setPassword}
        placeholder="Password"
        required={true}
      />
      <InputComponent
        state={confirmPassword}
        type="password"
        setState={setConfirmPassword}
        placeholder="Confirm Password"
        required={true}
      />
      <Button
        text={loading ? "Loading..." : "SignUp"}
        disabled={loading}
        onClick={handleSignUp}
      />
    </>
  );
}

export default SignUpForm;
