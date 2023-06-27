import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "../Pages/SIgnup/Signup";
import Question from "../Pages/Questions/Question";
import Signin from "../Pages/Signin/Signin";
import QrComponent from "../Pages/Qrcode/QrCodeComponent";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import FirebasePractice from "../Pages/FirebasePractice/FirebasePractice";
import FirebaseRealtime from "../Pages/FirebaseRealtime/FirebaseRealtime";

const AllRoutes = () => {
  const [userAuthenticated, setUserAuthenticated] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUserAuthenticated(true);
        console.log("user is authenticated");
      } else {
        setUserAuthenticated(false);
        console.log("user is not authenticated");
      }
    });
  }, []);

  return (
    <Routes>
      <Route
        path="/download"
        element={userAuthenticated ? <QrComponent /> : <Signup />}
      />
      <Route path="/" element={userAuthenticated ? <Question /> : <Signup />} />
      <Route
        path="/signin"
        element={userAuthenticated ? <Question /> : <Signin />}
      />
      <Route
        path="/questions"
        element={userAuthenticated ? <Question /> : <Signup />}
      />
      <Route path="/firebaseFunc" element={<FirebasePractice />} />
      <Route path="/firebaseReal" element={<FirebaseRealtime />} />
    </Routes>
  );
};

export default AllRoutes;
