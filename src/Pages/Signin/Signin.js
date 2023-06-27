import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("123456789");

  const [isAuthenticate, setIsAuthenticate] = useState(false);
  const navigate = useNavigate();

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      setIsAuthenticate(true);
      console.log("Authenticated");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isAuthenticate) navigate("/download");
  }, [isAuthenticate]);

  return (
    <div className="main-container">
      <div className="content-div">
        <input
          placeholder="Email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={signIn}>Sign In</button>
      </div>
    </div>
  );
};

export default Signin;
