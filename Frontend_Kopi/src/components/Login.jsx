import React, { useContext, useEffect } from "react";
import UserContext from "../context/user";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_SERVER + "/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await res.json();
      userCtx.setAccessToken(data.access);
      const decoded = jwtDecode(data.access);
      userCtx.setEmail(decoded.email);
      userCtx.setPassword(decoded.password);
      userCtx.setRole(decoded.role);
    } catch (error) {
      console.log(error.message);
    }
  };

  const navigateToProfile = () => {
    navigate("/profile");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="login-box">
        <h3> Welcome to the Kopi App </h3>
        <input placeholder="email" />
        <input placeholder="password" />
        <button
          className="login-button"
          onClick={() => {
            handleLogin();
            navigateToProfile();
          }}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default Login;
// I need to have the logic where if the user fails login, they get routed to the registration page
