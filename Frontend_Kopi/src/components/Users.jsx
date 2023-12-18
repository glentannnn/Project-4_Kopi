import React, { useState, useContext } from "react";
import styles from "./UpdateUserModal";
import UserContext from "../context/user";
import { setegid } from "process";

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
          Authorization: "Bearer " + userCtx.accessToken,
        },
        body: JSON.stringify({ name, email, password, role }),
      });
      getUsers();
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
      <div className="text-center my-5 mx-5">
        <h5>Users List</h5>
      </div>

      {users.map((item) => {
        <div className={`${styles.users}`}>
          <div className={`${styles.usersDetail}`}>Name: {item.user_name}</div>
          <div className={`${styles.usersDetail}`}>
            Email: {item.user_email}
          </div>
          <div className={`${styles.usersDetail}`}>Role: {item.user_role}</div>

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
        </div>;
      })}

      <div className="text-center my-5 mx-5">
        <h5>Add User</h5>
        <div>
          <select
            id="users"
            name="users"
            className="form-control my-3"
            defaultValue={""}
            onChange={(e) => setUsers(e.target.value)}
          >
            <option className="form-control my-3" value="" disabled>
              --Please user's role--
            </option>
            {/* loop below, put this to later after functionality completed. Also attempt to reformat the words to nicer looking words from backend */}
            <option className="form-control my-3" value="USER">
              User
            </option>
            <option className="form-control my-3" value="ADMIN">
              Admin
            </option>
          </select>

          <input
            type="text"
            placeholder="Input equipment's model here"
            className="form-control my-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="Input equipment's modification here"
            className="form-control my-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="Input equipment's modification here"
            className="form-control my-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>

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
