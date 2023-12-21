import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./UpdateUserModal.module.css";

const Overlay = (props) => {
  useEffect(() => {
    props.setName(props.user_name);
    props.setEmail(props.user_email);
    props.setPassword("");
    props.setRole(props.user_role);
  }, []);

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <input
          type="text"
          placeholder="Name"
          // className="form-control my-3"
          className={styles.modalInput}
          value={props.name}
          onChange={(e) => props.setName(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Email"
          // className="form-control my-3"
          className={styles.modalInput}
          value={props.email}
          onChange={(e) => props.setEmail(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Password"
          // className="form-control my-3"
          className={styles.modalInput}
          value={props.password}
          onChange={(e) => props.setPassword(e.target.value)}
        ></input>
        <select
          id="role"
          name="role"
          // className="form-control my-3"
          className={styles.modalInput}
          defaultValue={""}
          onChange={(e) => props.setRole(e.target.value)}
        >
          <option value="" disabled>
            Role
          </option>
          {/* loop below, put this to later after functionality completed. Also attempt to reformat the words to nicer looking words from backend */}
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select>

        <button
          // className="btn btn-success btn-block"
          className={styles.updateButton}
          onClick={() => {
            props.updateUser(props.user_id);
            props.setShowUpdateModal(false);
          }}
        >
          Update
        </button>
        <button
          // className="btn btn-success btn-block"
          className={styles.updateButton}
          onClick={() => {
            props.setShowUpdateModal(false);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

const UpdateUserModal = (props) => {
  return (
    <>
      {createPortal(
        <Overlay
          user_id={props.user_id}
          user_name={props.user_name}
          user_email={props.user_email}
          user_password={props.user_password}
          user_role={props.user_role}
          getUsers={props.getUsers}
          deleteUser={props.deleteUser}
          updateUser={props.updateUser}
          name={props.name}
          setName={props.setName}
          email={props.email}
          setEmail={props.setEmail}
          password={props.password}
          setPassword={props.setPassword}
          role={props.role}
          setRole={props.setRole}
          setShowUpdateModal={props.setShowUpdateModal}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default UpdateUserModal;
