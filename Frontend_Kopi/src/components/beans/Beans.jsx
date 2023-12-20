import React, { useContext, useState, useEffect } from "react";
import UserContext from "../../context/user";
import Navbar from "../Navbar";
import BeansCard from "./BeansCard";
import styles from "./Beans.module.css";

const Beans = () => {
  const userCtx = useContext(UserContext);
  // const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [beans, setBeans] = useState([]);
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [type, setType] = useState("");
  const [taste, setTaste] = useState("");
  const [roastdate, setRoastdate] = useState("");
  const [prevgrindsize, setPrevgrindsize] = useState("");
  const [remarks, setRemarks] = useState("");
  // console.log(beans);

  const getBeans = async () => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER + "/api/beans/" + userCtx.id,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userCtx.accessToken,
          },
        }
      );
      const data = await res.json();
      console.log(data);
      setBeans(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const addBeans = async () => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER + "/api/beans/" + userCtx.id,
        {
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
        }
      );

      const data = await res.json();
      console.log(data);
      getBeans();
      setCountry("");
      setRegion("");
      setType("");
      setTaste("");
      setRoastdate("");
      setPrevgrindsize("");
      setRemarks("");
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
    setCountry("");
    setRegion("");
    setType("");
    setTaste("");
    setRoastdate("");
    setPrevgrindsize("");
    setRemarks("");
  }, []);

  return (
    <>
      <Navbar></Navbar>

      <div className="text-center my-5 mx-5">
        <h5>Your Beans</h5>
      </div>

      {/* {showUpdateModal && (
        <UpdateBeanModal
          bean_id={bean_id}
          beans={beans}
          country={country}
          setCountry={setCountry}
          region={region}
          setRegion={setRegion}
          type={type}
          setType={setType}
          taste={taste}
          setTaste={setTaste}
          roastdate={roastdate}
          setRoastdate={setRoastdate}
          prevgrindsize={prevgrindsize}
          setPrevgrindsize={setPrevgrindsize}
          remarks={remarks}
          setRemarks={setRemarks}
          updateBeans={updateBeans}
          setShowUpdateModal={setShowUpdateModal}
        />
      )} */}

      {beans.map((item) => {
        return (
          <BeansCard
            key={item.bean_id}
            bean_id={item.bean_id}
            bean_country={item.bean_country}
            bean_region={item.bean_region}
            bean_type={item.bean_type}
            bean_taste={item.bean_taste}
            bean_roastdate={item.bean_roastdate}
            bean_prevgrindsize={item.bean_prevgrindsize}
            bean_remarks={item.bean_remarks}
            user_id={item.user_id}
            getBeans={getBeans}
            deleteBeans={deleteBeans}
            updateBeans={updateBeans}
            country={country}
            setCountry={setCountry}
            region={region}
            setRegion={setRegion}
            type={type}
            setType={setType}
            taste={taste}
            setTaste={setTaste}
            roastdate={roastdate}
            setRoastdate={setRoastdate}
            prevgrindsize={prevgrindsize}
            setPrevgrindsize={setPrevgrindsize}
            remarks={remarks}
            setRemarks={setRemarks}
          />
        );
      })}

      <div className="text-center my-5 mx-5">
        <h5>Add Bean</h5>
        <div>
          <input
            type="text"
            placeholder="Country"
            className="form-control my-3"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="Region"
            className="form-control my-3"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          ></input>
          <select
            id="beans"
            name="beans"
            className="form-control my-3"
            defaultValue={""}
            onChange={(e) => setType(e.target.value)}
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
            value={taste}
            onChange={(e) => setTaste(e.target.value)}
          ></input>
          <input
            type="date"
            placeholder="Roast Date"
            className="form-control my-3"
            value={roastdate}
            onChange={(e) => setRoastdate(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="Previous Grind Size"
            className="form-control my-3"
            value={prevgrindsize}
            onChange={(e) => setPrevgrindsize(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="Remarks"
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
