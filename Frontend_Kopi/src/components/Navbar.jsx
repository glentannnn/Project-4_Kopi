import React, { useContext } from "react";
import { Link, NavLink, Routes, Route } from "react-router-dom";
import styles from "./Navbar.module.css";
import UserContext from "../context/user";

const Navbar = () => {
  const userCtx = useContext(UserContext);

  return (
    <div className={styles.nav}>
      <div className={styles.navHeader}>
        <h3>Kopi</h3>
      </div>
      <hr></hr>
      <nav className={styles.navButtonContainer}>
        <NavLink to="/profile">
          <button className={styles.navButton}>Profile</button>
        </NavLink>

        <NavLink to="/beans">
          <button className={styles.navButton}>Beans</button>
        </NavLink>

        {userCtx.role === "ADMIN" ? (
          <NavLink to="/users">
            <button className={styles.navButton}>Users</button>
          </NavLink>
        ) : null}
      </nav>
    </div>
  );
};

export default Navbar;
