import { auth, googleProvider } from "../../config/firebase";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { collection, addDoc } from "@firebase/firestore";
import { db } from "../../config/firebase";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isAuthenticate, setIsAuthenticate] = useState(false);
  const navigate = useNavigate();

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const docRef = await addDoc(collection(db, "userData"), {
        user: "",
      });
      console.log("Document written with ID: ", docRef.id);
      setIsAuthenticate(true);
      console.log("Authenticated");
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isAuthenticate) navigate("/questions");
  }, [isAuthenticate]);

  return (
    <div className="main-container">
      <div className="content-div">
        <input
          placeholder="Email..."
          onChange={(e) => 
            setEmail(e.target.value)
          }
        />
        <input
          placeholder="Password..."
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={signIn}> Sign In</button>

        <button onClick={logout}> Logout </button>
      </div>
    </div>
  );
};

export default Signup;
