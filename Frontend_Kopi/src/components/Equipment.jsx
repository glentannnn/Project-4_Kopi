import React, { useContext, useState } from "react";
import UserContext from "../context/user";
import styles from "./Equipment.module.css";
import UpdateEquipmentModal from "./UpdateEquipmentModal";

const Equipment = (props) => {
  const userCtx = useContext(UserContext);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  return (
    <div>
      {showUpdateModal && (
        <UpdateEquipmentModal
          equipment_id={props.equipment_id}
          equipment_type={props.equipment_type}
          equipment_model={props.equipment_model}
          equipment_modification={props.equipment_modification}
          updateEquipment={props.updateEquipment}
          getEquipment={props.getEquipment}
          setShowUpdateModal={setShowUpdateModal}
          type={props.type}
          setType={props.setType}
          model={props.model}
          setModel={props.setModel}
          modification={props.modification}
          setModification={props.setModification}
        />
      )}
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

          <button
            className="btn btn-success btn-block my-2"
            onClick={() => setShowUpdateModal(true)}
          >
            Update
          </button>
          <button
            className="btn btn-success btn-block my-2"
            onClick={() => props.deleteEquipment(props.equipment_id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Equipment;
