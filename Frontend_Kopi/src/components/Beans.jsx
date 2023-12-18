import React, { useContext, useState } from "react";
import styles from "./UpdateBeanModal";
import UserContext from "../context/user";

const Beans = () => {
  const userCtx = useContext(UserContext);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [beans, setBeans] = useState([]);
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [type, setType] = useState("");
  const [taste, setTaste] = useState("");
  const [roastdate, setRoastdate] = useState("");
  const [prevgrindsize, setPrevgrindsize] = useState("");
  const [remarks, setRemarks] = useState("");
  console.log(beans);

  const getBeans = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_SERVER + "/api/beans", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userCtx.accessToken,
        },
      });
      const data = await res.json();
      console.log(data);
      setBeans(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const addBeans = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_SERVER + "/api/beans", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userCtx.accessToken,
        },
        body: JSON.stringify({
          country,
          region,
          type,
          taste,
          roastdate,
          prevgrindsize,
          remarks,
        }),
      });
      getBeans();
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteBeans = async (id) => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER + "/api/beans/delete/" + id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userCtx.accessToken,
          },
        }
      );
      getBeans();
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateBeans = async (id) => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER + "/api/beans/update/" + id,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userCtx.accessToken,
          },
          body: JSON.stringify({
            country,
            region,
            type,
            taste,
            roastdate,
            prevgrindsize,
            remarks,
          }),
        }
      );
      getBeans();
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getBeans();
  }, []);

  return (
    <>
      <div className="text-center my-5 mx-5">
        <h5>Your Beans</h5>
      </div>

      {beans.map((item) => {
        <div className={`${styles.beans}`}>
          <div className={`${styles.beansCard}`}>
            <div className={`${styles.beansDetail}`}>
              Country: {item.bean_country}
            </div>
            <div className={`${styles.beansDetail}`}>
              Region: {item.bean_region}
            </div>
            <div className={`${styles.beansDetail}`}>
              Type: {item.bean_type}
            </div>
            <div className={`${styles.beansDetail}`}>
              Taste: {item.bean_taste}
            </div>
            <div className={`${styles.beansDetail}`}>
              Roast Date: {item.bean_roastdate}
            </div>
            <div className={`${styles.beansDetail}`}>
              Prev Grind Size: {item.bean_prevgrindsize}
            </div>
            <div className={`${styles.beansDetail}`}>
              Remarks: {item.bean_remark}
            </div>

            {/* <button
              className="btn btn-success btn-block my-2"
              onClick={() => setShowUpdateModal(true)}
            >
              Update
            </button> */}

            <button
              className="btn btn-success btn-block my-2"
              onClick={() => deleteBeans(item.bean_id)}
            >
              Delete
            </button>
          </div>
        </div>;
      })}

      <div className="text-center my-5 mx-5">
        <h5>Add Bean</h5>
        <div>
          <select
            id="bean"
            name="bean"
            className="form-control my-3"
            defaultValue={""}
            onChange={(e) => setType(e.target.value)}
          >
            <option className="form-control my-3" value="" disabled>
              --Please select a bean type--
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
            placeholder="Input bean's country here"
            className="form-control my-3"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="Input bean's region here"
            className="form-control my-3"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="Input bean's taste here"
            className="form-control my-3"
            value={taste}
            onChange={(e) => setTaste(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="Input bean's roast date here"
            className="form-control my-3"
            value={roastdate}
            onChange={(e) => setRoastdate(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="Input bean's previous grind size here"
            className="form-control my-3"
            value={prevgrindsize}
            onChange={(e) => setPrevgrindsize(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="Input bean's remark here"
            className="form-control my-3"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          ></input>

          <button
            className="btn btn-success btn-block"
            onClick={() => {
              addBeans();
            }}
          >
            Add
          </button>
        </div>
      </div>
    </>
  );
};

export default Beans;
