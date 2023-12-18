import React, { useState, useContext } from "react";
import styles from "./UpdateUserModal";
import UserContext from "../context/user";

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
    </>
  );
};

export default Users;
