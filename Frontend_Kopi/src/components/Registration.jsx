import React, { useContext, useState, useEffect } from "react";
// import UserContext from "../context/user";
import { Link } from "react-router-dom";

const Registration = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  //  role by default should be user, unless changed by admin. Default admin will be created in the backend.

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
          type="text"
          placeholder="password"
          className="form-control my-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* Remove the role section and set DEFAULT to DB side */}
        {/* <select
          id="role"
          name="role"
          className="form-control my-3"
          defaultValue={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option className="form-control my-3" value="USER">
            USER
          </option>
        </select> */}

        <button
          className="btn btn-success btn-block"
          onClick={() => {
            registerUser();
          }}
        >
          Register
        </button>
        <br></br>
        <div>
          <Link to="/login">Already a user? Go to login here.</Link>
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
