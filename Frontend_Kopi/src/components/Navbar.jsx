import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import UserContext from "../context/user";

const Navbar = () => {
  const userCtx = useContext(UserContext);

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/profile">Profile</NavLink>
        </li>
        <li>
          <NavLink to="/beans">Beans</NavLink>
        </li>
        {userCtx.role === "ADMIN" ? (
          <li>
            <NavLink to="/users">Users</NavLink>
          </li>
        ) : null}
      </ul>
    </nav>
  );
};

export default Navbar;
