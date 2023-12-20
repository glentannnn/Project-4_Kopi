<div key={item.bean_id} className={`${styles.beans}`}>
  <div className={`${styles.beansCard}`}>
    <div className={`${styles.beansDetail}`}>Country: {item.bean_country}</div>
    <div className={`${styles.beansDetail}`}>Region: {item.bean_region}</div>
    <div className={`${styles.beansDetail}`}>Type: {item.bean_type}</div>
    <div className={`${styles.beansDetail}`}>Taste: {item.bean_taste}</div>
    <div className={`${styles.beansDetail}`}>
      Roast Date: {item.bean_roastdate}
    </div>
    <div className={`${styles.beansDetail}`}>
      Prev Grind Size: {item.bean_prevgrindsize}
    </div>
    <div className={`${styles.beansDetail}`}>Remarks: {item.bean_remarks}</div>

    <button
      className="btn btn-success btn-block my-2"
      onClick={() => setShowUpdateModal(true)}
    >
      Update
    </button>
    <button
      className="btn btn-success btn-block my-2"
      onClick={() => deleteBeans(item.bean_id)}
    >
      Delete
    </button>
  </div>
</div>;
