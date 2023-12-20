import React, { useContext, useState } from "react";
import UserContext from "../../context/user";
import UpdateBeanModal from "./UpdateBeanModal";
import styles from "./BeansCard.module.css";

const BeansCard = (props) => {
  const userCtx = useContext(UserContext);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  return (
    <div>
      {showUpdateModal && (
        <UpdateBeanModal
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
          setShowUpdateModal={setShowUpdateModal}
        />
      )}
      <div /*key={item.bean_id}*/ className={`${styles.beans}`}>
        <div className={`${styles.beansCard}`}>
          <div className={`${styles.beansDetail}`}>
            Country: {props.bean_country}
          </div>
          <div className={`${styles.beansDetail}`}>
            Region: {props.bean_region}
          </div>
          <div className={`${styles.beansDetail}`}>Type: {props.bean_type}</div>
          <div className={`${styles.beansDetail}`}>
            Taste: {props.bean_taste}
          </div>
          <div className={`${styles.beansDetail}`}>
            Roast Date: {props.bean_roastdate}
          </div>
          <div className={`${styles.beansDetail}`}>
            Prev Grind Size: {props.bean_prevgrindsize}
          </div>
          <div className={`${styles.beansDetail}`}>
            Remarks: {props.bean_remarks}
          </div>

          <button
            className="btn btn-success btn-block my-2"
            onClick={() => setShowUpdateModal(true)}
          >
            Update
          </button>
          <button
            className="btn btn-success btn-block my-2"
            onClick={() => props.deleteBeans(props.bean_id)}
          >
            Delete
          </button>
        </div>
      </div>
      ;
    </div>
  );
};

export default BeansCard;
