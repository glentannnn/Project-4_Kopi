import React, { useContext, useState } from "react";
import UserContext from "../../context/user";
import UpdateEquipmentModal from "./UpdateEquipmentModal";
import styles from "./Equipment.module.css";

const Equipment = (props) => {
  const userCtx = useContext(UserContext);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  return (
    <div className={`${styles.equipment}`}>
      {showUpdateModal && (
        <UpdateEquipmentModal
          equipment_id={props.equipment_id}
          equipment_type={props.equipment_type}
          equipment_model={props.equipment_model}
          equipment_modification={props.equipment_modification}
          type={props.type}
          setType={props.setType}
          model={props.model}
          setModel={props.setModel}
          modification={props.modification}
          setModification={props.setModification}
          updateEquipment={props.updateEquipment}
          setShowUpdateModal={setShowUpdateModal}
        />
      )}

      <div>
        <div className={`${styles.equipmentCard}`}>
          {/* <div className={`${styles.equipment-detail}`}></div> */}
          <div className={`${styles.equipmentDetail}`}>
            <span>Type:</span> {props.equipment_type}
          </div>
          <div className={`${styles.equipmentDetail}`}>
            <span>Model:</span> {props.equipment_model}
          </div>
          <div className={`${styles.equipmentDetail}`}>
            <span>Modification:</span> {props.equipment_modification}
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
              onClick={() => props.deleteEquipment(props.equipment_id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Equipment;
