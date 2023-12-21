import React, { useContext, useState } from "react";
import UserContext from "../../context/user";
import UpdateUserModal from "./UpdateUserModal";
import styles from "./UsersCard.module.css";

const UsersCard = (props) => {
  const userCtx = useContext(UserContext);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  return (
    <div>
      {showUpdateModal && (
        <UpdateUserModal
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
          setShowUpdateModal={setShowUpdateModal}
        />
      )}

      <div /*key={item.user_id}*/ className={`${styles.users}`}>
        <div className={`${styles.usersCard}`}>
          <div className={`${styles.usersDetail}`}>
            <span>Name:</span> {props.user_name}
          </div>
          <div className={`${styles.usersDetail}`}>
            <span>Email:</span> {props.user_email}
          </div>
          <div className={`${styles.usersDetail}`}>
            <span>Role:</span> {props.user_role}
          </div>

          <div className={styles.buttonContainer}>
            <button
              // className="btn btn-success btn-block my-2"
              className={styles.cardButton}
              onClick={() => setShowUpdateModal(true)}
            >
              Update
            </button>
            <button
              // className="btn btn-success btn-block my-2"
              className={styles.cardButton}
              onClick={() => props.deleteUser(props.user_id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersCard;
