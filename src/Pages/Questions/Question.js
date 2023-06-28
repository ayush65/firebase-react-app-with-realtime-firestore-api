import React, { useEffect, useState } from "react";
import { collection, addDoc } from "@firebase/firestore";
import { auth, database, db } from "../../config/firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { onValue, ref, update } from "firebase/database";
import { useNavigate } from "react-router-dom";

const Question = () => {
  const [answers, setAnswers] = useState([]);
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const handleButtonClick = (question, answer) => {
    const hasDesiredQuestion = answers.some(
      (questions) => questions.question === question
    );

    if (hasDesiredQuestion) {
      console.log("this question has already been done. ");
    } else {
      const newAnswer = { question, answer };
      setAnswers((prevAnswers) => [...prevAnswers, newAnswer]);
    }
  };

  const finishQuestionnaire = async () => {
    try {
      const docRef = await addDoc(collection(db, "answers"), {
        todo: answers,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    console.log(answers);
  };

  const Exit = async () => {
    try {
      update(ref(database, `/logins/${user.uid}`), {
        email: user.email,
        status: "offline",
        logout: new Date().toISOString(),
      });
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
    const auth = getAuth();
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const uid = currentUser.uid;
        setUser(currentUser);
        update(ref(database, `/logins/${currentUser.uid}`), {
          email: currentUser.email,
          status: "online",
          loginTime: new Date(),
        });
      } else {
        navigate("/");
      }
    });
  }, []);

  window.onunload = () => {
    update(ref(database, `/logins/${user.uid}`), {
      status: "offline",
      logout: new Date(),
    });
  };

  return (
    <div className="main-container">
      <div className="content-div">
        <div className="question-area">
          <h3>Hey are you above than 18 ?</h3>
          <div className="question-area__button-div">
            <button
              onClick={() => handleButtonClick("Are you above 18?", "Yes")}
            >
              Yes
            </button>
            <button
              onClick={() => handleButtonClick("Are you above 18?", "No")}
            >
              No
            </button>
          </div>
        </div>

        <div className="question-area">
          <h3>Hey are you above than 25 ?</h3>
          <div className="question-area__button-div">
            <button
              onClick={() => handleButtonClick("Are you above 25?", "Yes")}
            >
              Yes
            </button>
            <button
              onClick={() => handleButtonClick("Are you above 25?", "No")}
            >
              No
            </button>
          </div>
        </div>

        <div className="question-area">
          <h3>Hey are you above than 30 ?</h3>
          <div className="question-area__button-div">
            <button
              onClick={() => handleButtonClick("Are you above 30 ? ", "Yes")}
            >
              Yes
            </button>
            <button
              onClick={() => handleButtonClick("Are you above 30 ? ", "No")}
            >
              No
            </button>
          </div>
        </div>

        <button onClick={finishQuestionnaire}>Finish</button>

        <button onClick={logout}> Logout </button>
        <div>
          <button onClick={Exit}> Exit </button>
        </div>
      </div>
    </div>
  );
};

export default Question;
