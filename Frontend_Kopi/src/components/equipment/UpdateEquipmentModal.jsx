import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./UpdateEquipmentModal.module.css";

const Overlay = (props) => {
  useEffect(() => {
    props.setType(props.equipment_type);
    props.setModel(props.equipment_model);
    props.setModification(props.equipment_modification);
  }, []);

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <select
          id="equipment"
          name="equipment"
          className={styles.modalInput}
          // defaultValue={""}
          onChange={(e) => props.setType(e.target.value)}
        >
          <option className="form-control my-3" value="" disabled>
            Type
          </option>
          {/* loop below, put this to later after functionality completed. Also attempt to reformat the words to nicer looking words from backend */}
          <option className="form-control my-3" value="GRINDER">
            Grinder
          </option>
          <option className="form-control my-3" value="ESPRESSOMACHINE">
            Espresso Machine
          </option>
          <option className="form-control my-3" value="V60">
            V60
          </option>
        </select>
        <input
          type="text"
          placeholder="Input changes to model here"
          className={styles.modalInput}
          value={props.model}
          onChange={(e) => props.setModel(e.target.value)}
        />
        <input
          type="text"
          placeholder="Input changes to modification here"
          className={styles.modalInput}
          value={props.modification}
          onChange={(e) => props.setModification(e.target.value)}
        />
        <div className={styles.updateButtonContainer}>
          <button
            className={styles.updateButton}
            onClick={() => {
              props.updateEquipment(props.equipment_id);
              props.setShowUpdateModal(false);
            }}
          >
            Update
          </button>
          <button
            className={styles.updateButton}
            onClick={() => {
              props.setShowUpdateModal(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const UpdateEquipmentModal = (props) => {
  return (
    <>
      {createPortal(
        <Overlay
          equipment_id={props.equipment_id}
          equipment_type={props.equipment_type}
          equipment_model={props.equipment_model}
          equipment_modification={props.equipment_modification}
          // user_id={props.user_id}
          type={props.type}
          setType={props.setType}
          model={props.model}
          setModel={props.setModel}
          modification={props.modification}
          setModification={props.setModification}
          updateEquipment={props.updateEquipment}
          setShowUpdateModal={props.setShowUpdateModal}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default UpdateEquipmentModal;
