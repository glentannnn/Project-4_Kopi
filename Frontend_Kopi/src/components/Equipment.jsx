import React, { useContext } from "react";
import UserContext from "../context/user";
import styles from "./Equipment.module.css";

const Equipment = (props) => {
  const userCtx = useContext(UserContext);
  return (
    <div>
      <div className={`${styles.equipment}`}>
        <div className={`${styles.equipmentCard}`}>
          {/* <div className={`${styles.equipment-detail}`}></div> */}
          <div className={`${styles.equipmentDetail}`}>
            Type: {props.equipment_type}
          </div>
          <div className={`${styles.equipmentDetail}`}>
            Model: {props.equipment_model}
          </div>
          <div className={`${styles.equipmentDetail}`}>
            Modification: {props.equipment_modification}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Equipment;
