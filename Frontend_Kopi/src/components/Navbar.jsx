import React from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/profile">Profile</NavLink>
        </li>
        <li>
          <NavLink to="/profile/beans">Beans</NavLink>
        </li>
        <li>
          <NavLink to="/profile/users">Users</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
