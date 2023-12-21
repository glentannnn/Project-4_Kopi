import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./UpdateBeanModal.module.css";

const Overlay = (props) => {
  useEffect(() => {
    props.setCountry(props.bean_country);
    props.setRegion(props.bean_region);
    props.setType(props.bean_type);
    props.setTaste(props.bean_taste);
    props.setRoastdate(props.bean_roastdate);
    props.setPrevgrindsize(props.bean_prevgrindsize);
    props.setRemarks(props.bean_remarks);
  }, []);

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
          // defaultValue={""}
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
            props.updateBeans(props.bean_id);
            props.setShowUpdateModal(false);
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
  // console.log(props.bean_id);
  return (
    <>
      {createPortal(
        <Overlay
          bean_id={props.bean_id}
          bean_country={props.bean_country}
          bean_region={props.bean_region}
          bean_type={props.bean_type}
          bean_taste={props.bean_taste}
          bean_roastdate={props.bean_roastdate}
          bean_prevgrindsize={props.bean_prevgrindsize}
          bean_remarks={props.bean_remarks}
          user_id={props.user_id}
          getBeans={props.getBeans}
          deleteBeans={props.deleteBeans}
          updateBeans={props.updateBeans}
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
          setShowUpdateModal={props.setShowUpdateModal}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default UpdateBeanModal;
