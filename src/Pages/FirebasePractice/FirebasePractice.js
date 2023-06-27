import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/functions";
import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "../../config/firebase";

import { getFirestore, collection, onSnapshot } from "firebase/firestore";

import "./firebaseFunc.css";

const FirebasePractice = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartmnet] = useState("");

  const createUser = async () => {
    try {
      const createUserFunction = httpsCallable(getFunctions(app), "createUser");

      const { data } = await createUserFunction({ name, email, department });

      const { userId } = data;

      console.log("User created with ID:", userId);
    } catch (error) {
      console.error("Failed to create user:", error);
    }
  };

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const db = getFirestore();
      const usersCollection = collection(db, "users");

      onSnapshot(usersCollection, (snapshot) => {
        const updatedUsers = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(updatedUsers);
      });
    };

    fetchUsers();
  }, []);

  return (
    <div className="user-content-container">
      <div className="user-content-div">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartmnet(e.target.value)}
        />
        <button onClick={createUser}>Create User</button>
      </div>

      <div className="user-content-div">
        <h2>User List</h2>
        <ul>
          {users.map((user) => (
            <>
              {" "}
              <h2 key={user.id}>
                {user.name} - {user.email} - {user.department}
              </h2>
            </>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FirebasePractice;
