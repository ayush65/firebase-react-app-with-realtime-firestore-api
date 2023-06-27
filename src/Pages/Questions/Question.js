import React, { useEffect, useState } from "react";
import { collection, addDoc } from "@firebase/firestore";
import { db } from "../../config/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Question = () => {
  const [answers, setAnswers] = useState([]);

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
      </div>
    </div>
  );
};

export default Question;
