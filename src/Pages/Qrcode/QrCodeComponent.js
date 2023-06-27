import React, { useEffect, useRef, useState } from "react";

import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";

const QrComponent = () => {
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();
  const qrRef = useRef(null);

  const handleDownloadClick = () => {
    html2canvas(qrRef.current).then((canvas) => {
      const img = new Image();
      img.src = canvas.toDataURL();
      img.onload = () => {
        const link = document.createElement("a");
        link.href = img.src;
        link.download = "My Qr.jpg";
        link.click();
      };
    });
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div div className="main-container">
      <div className="content-div">
        <h1>Download QR code to avail the offer</h1>
      </div>
      <div>
        <div ref={qrRef}>
          <QRCode value={userEmail} />
        </div>
        <button onClick={handleDownloadClick}>Download</button>
        <button onClick={logout}> Logout </button>
      </div>
    </div>
  );
};

export default QrComponent;
