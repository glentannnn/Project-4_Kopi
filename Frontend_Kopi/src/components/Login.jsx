import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/user";
import { jwtDecode } from "jwt-decode";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";

const Login = (props) => {
  const userCtx = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_SERVER + "/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      console.log(data);

      //   Input data into UserContext
      userCtx.setAccessToken(data.accessToken);
      const decoded = jwtDecode(data.accessToken);
      console.log(decoded);
      userCtx.setId(decoded.id);
      userCtx.setName(decoded.name);
      userCtx.setEmail(decoded.email);
      userCtx.setPassword(decoded.password);
      userCtx.setRole(decoded.role);

      // localStorage.setItem("accessToken", data.accessToken);
      props.setAuthentication(true);
    } catch (error) {
      console.log(error.message);
      alert("Incorrect password or email. Please try again.");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="text-center my-5 mx-5">
        <h3> Welcome to the Kopi App </h3>

        <input
          type="email"
          placeholder="email"
          className="form-control my-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="password"
          className="form-control my-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="btn btn-success btn-block"
          onClick={() => {
            handleLogin();
          }}
        >
          Enter
        </button>
        <br></br>
        <div>
          <Link to="/registration">New to Kopi App? Register here.</Link>
        </div>
      </div>
    </>
  );
};

export default Login;
