import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../context/user";
import Navbar from "../Navbar";
import styles from "./Users.module.css";
// import UpdateUserModal from "./UpdateUserModal";

const Users = () => {
  const userCtx = useContext(UserContext);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const getUsers = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_SERVER + "/auth/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userCtx.accessToken,
        },
      });
      const data = await res.json();
      console.log(data);
      setUsers(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const addUser = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_SERVER + "/auth/register", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Authorization: "Bearer " + userCtx.accessToken,
        },
        body: JSON.stringify({ name, email, password, role }),
      });
      getUsers();
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteUser = async (id) => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER + "/auth/users/delete/" + id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userCtx.accessToken,
          },
        }
      );
      getUsers();
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateUser = async (id) => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER + "/auth/users/update/" + id,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userCtx.accessToken,
          },
          body: JSON.stringify({ name, email, password, role }),
        }
      );
      getUsers();
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Navbar></Navbar>

      <div className="text-center my-5 mx-5">
        <h5>Users List</h5>
      </div>

      {users.map((item) => {
        return (
          <div key={item.user_id} className={`${styles.users}`}>
            <div className={`${styles.usersCard}`}>
              <div className={`${styles.usersDetail}`}>
                Name: {item.user_name}
              </div>
              <div className={`${styles.usersDetail}`}>
                Email: {item.user_email}
              </div>
              <div className={`${styles.usersDetail}`}>
                Role: {item.user_role}
              </div>

              {/* <button
              className="btn btn-success btn-block my-2"
              onClick={() => setShowUpdateModal(true)}
            >
              Update
            </button> */}
              <button
                className="btn btn-success btn-block my-2"
                onClick={() => deleteUser(item.user_id)}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}

      <div className="text-center my-5 mx-5">
        <h5>Add User</h5>
        <div>
          <input
            type="text"
            placeholder="Name"
            className="form-control my-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="Email"
            className="form-control my-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="Password"
            className="form-control my-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>

          <select
            id="role"
            name="role"
            className="form-control my-3"
            defaultValue={""}
            onChange={(e) => setRole(e.target.value)}
          >
            <option className="form-control my-3" value="" disabled>
              Role
            </option>
            {/* loop below, put this to later after functionality completed. Also attempt to reformat the words to nicer looking words from backend */}
            <option className="form-control my-3" value="USER">
              User
            </option>
            <option className="form-control my-3" value="ADMIN">
              Admin
            </option>
          </select>

          <button
            className="btn btn-success btn-block"
            onClick={() => {
              addUser();
            }}
          >
            Add
          </button>
        </div>
      </div>
    </>
  );
};

export default Users;
