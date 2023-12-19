import React from "react";
import { createPortal } from "react-dom";
import styles from "./BeansModal.module.css";

const Overlay = (props) => {
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <input
          type="text"
          placeholder="Country"
          className="form-control my-3"
          value={props.country}
          onChange={(e) => props.setCountry(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Region"
          className="form-control my-3"
          value={props.region}
          onChange={(e) => props.setRegion(e.target.value)}
        ></input>
        <select
          id="beans"
          name="beans"
          className="form-control my-3"
          defaultValue={""}
          onChange={(e) => props.setType(e.target.value)}
        >
          <option className="form-control my-3" value="" disabled>
            Type
          </option>
          {/* loop below, put this to later after functionality completed. Also attempt to reformat the words to nicer looking words from backend */}
          <option className="form-control my-3" value="ESPRESSO">
            Espresso
          </option>
          <option className="form-control my-3" value="FILTER">
            Filter
          </option>
        </select>
        <input
          type="text"
          placeholder="Tasting Notes"
          className="form-control my-3"
          value={props.taste}
          onChange={(e) => props.setTaste(e.target.value)}
        ></input>
        <input
          type="date"
          placeholder="Roast Date"
          className="form-control my-3"
          value={props.roastdate}
          onChange={(e) => props.setRoastdate(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Previous Grind Size"
          className="form-control my-3"
          value={props.prevgrindsize}
          onChange={(e) => props.setPrevgrindsize(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Remarks"
          className="form-control my-3"
          value={props.remarks}
          onChange={(e) => props.setRemarks(e.target.value)}
        ></input>

        <button
          className="btn btn-success btn-block"
          onClick={() => {
            props.updateBeans(props.bean_id); // here is the issue
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

const UpdateBeanModal = (props) => {
  console.log(props.bean_id);
  return (
    <>
      {createPortal(
        <Overlay
          bean_id={props.bean_id}
          beans={props.beans}
          country={props.country}
          setCountry={props.setCountry}
          region={props.region}
          setRegion={props.setRegion}
          type={props.type}
          setType={props.setType}
          taste={props.taste}
          setTaste={props.setTaste}
          roastdate={props.roastdate}
          setRoastdate={props.setRoastdate}
          prevgrindsize={props.prevgrindsize}
          setPrevgrindsize={props.setPrevgrindsize}
          remarks={props.remarks}
          setRemarks={props.setRemarks}
          updateBeans={props.updateBeans}
          setShowUpdateModal={props.setShowUpdateModal}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default UpdateBeanModal;
