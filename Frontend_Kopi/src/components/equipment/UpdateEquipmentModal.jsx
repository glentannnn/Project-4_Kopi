import React from "react";
import { createPortal } from "react-dom";
import styles from "./EquipmentModal.module.css";

const Overlay = (props) => {
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <select
          id="equipment"
          name="equipment"
          className="form-control my-3"
          defaultValue={""}
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
          className="form-control my-3"
          value={props.model}
          onChange={(e) => props.setModel(e.target.value)}
        />
        <input
          type="text"
          placeholder="Input changes to modification here"
          className="form-control my-3"
          value={props.modification}
          onChange={(e) => props.setModification(e.target.value)}
        />

        <button
          className="btn btn-success btn-block"
          onClick={() => {
            props.updateEquipment(props.equipment_id);
          }}
        >
          Update
        </button>
        <button
          className="btn btn-success btn-block"
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

const UpdateEquipmentModal = (props) => {
  return (
    <>
      {createPortal(
        <Overlay
          equipment_id={props.equipment_id}
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
