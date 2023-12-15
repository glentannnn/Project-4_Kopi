import React, { useContext, useState, useEffect } from "react";
import UserContext from "../context/user";
import { Link } from "react-router-dom";

const Registration = (props) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  //  role by default should be user, unless changed by admin. Default admin will be created in the backend.

  const registerUser = async () => {
    try {
      const res = await fetch();
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="text-center my-3 mx-5">
        <h3>Register for the Kopi App</h3>
        <input
          type="text"
          placeholder="name"
          className="form-control my-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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

        <div>
          <Link to="/" onClick={() => props.setShowLogin(true)}>
            Already a user? Go to login here.
          </Link>
        </div>
      </div>
    </>
  );
};

export default Registration;
