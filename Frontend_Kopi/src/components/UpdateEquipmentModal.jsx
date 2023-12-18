import React from "react";
import { ReactDOM } from "react-dom";
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
            --Please select an equipment type--
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

        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-3">Model</div>
          <input
            type="text"
            className="col-md-3"
            placeholder="Input changes to model here"
            value={props.model}
            onChange={(e) => props.setModel(e.target.value)}
          />
          <div className="col-md-3"></div>
        </div>

        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-3">Modification</div>
          <input
            type="text"
            className="col-md-3"
            placeholder="Input changes to modification here"
            value={props.modification}
            onChange={(e) => props.setModification(e.target.value)}
          />
          <div className="col-md-3"></div>
        </div>

        <button
          className="btn btn-success btn-block"
          onClick={() => {
            props.updateEquipment();
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
      {ReactDOM.createPortal(
        <Overlay
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
