import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Registration.module.css";

const Registration = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");

  const registerUser = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_SERVER + "/auth/register", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();
      console.log(data);
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setName("");
    setEmail("");
    setPassword("");
  }, []);

  return (
    <>
      <div className={styles.registration}>
        <h3>Register for the Kopi App</h3>

        <input
          type="text"
          placeholder="name"
          // className={styles.registrationInput}
          className="form-control my-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="email"
          // className={styles.registrationInput}
          className="form-control my-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="password"
          // className={styles.registrationInput}
          className="form-control my-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          // className="btn btn-success btn-block"
          className={styles.registrationButton}
          onClick={() => {
            registerUser();
          }}
        >
          Register
        </button>
        <br></br>
        <div>
          <NavLink to="/login">Already a user? Go to login here.</NavLink>
          {/* <button
            className="btn btn-success btn-block my-2"
            onClick={() => props.setShowLogin(true)}
          >
            New to Kopi App? Register here.
          </button> */}
        </div>
      </div>
    </>
  );
};

export default Registration;
