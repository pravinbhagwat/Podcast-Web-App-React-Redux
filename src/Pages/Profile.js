import React from "react";
import { useSelector } from "react-redux";
import Header from "../Components/Common/Header";
import Button from "../Components/Common/Button";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import Loader from "../Components/Common/Loader";

function Profile() {
  const user = useSelector((state) => state.user.user);
  console.log("user", user);

  if (!user) {
    return <Loader />;
  }

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("User Logged Out!");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div>
      <Header />
      <div className="input-container">
        <div className="input-wrapper profile-h1" style={{alignItems:'start',gap:'0'}}>
          <h1>
            Username:{" "}
            <strong style={{ fontWeight: "normal" }}>{user.name}</strong>
          </h1>
          <h1>
            Email:{" "}
            <strong style={{ fontWeight: "normal" }}>{user.email}</strong>
          </h1>
          <h1 style={{marginBottom:'30px'}}>
            UID: <strong style={{ fontWeight: "normal" }}>{user.uid}</strong>
          </h1>
          <Button text={"Logout"} onClick={handleLogout} width={'300px'}/>
        </div>
      </div>
    </div>
  );
}

export default Profile;
