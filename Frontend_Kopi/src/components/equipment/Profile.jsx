import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../context/user";
import Equipment from "./Equipment";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
import Navbar from "../Navbar";
import styles from "./Profile.module.css";

const Profile = () => {
  const [name, setName] = useState("");
  const [equipment, setEquipment] = useState([]);
  const [type, setType] = useState("");
  const [model, setModel] = useState("");
  const [modification, setModification] = useState("");
  const userCtx = useContext(UserContext);
  // console.log(equipment);
  // console.log(userCtx.id);

  const getName = async () => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER + "/auth/users/" + userCtx.id,
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
      setName(data.user_name);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getEquipment = async () => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER + "/api/equipment/" + userCtx.id,
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
      setEquipment(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const addEquipment = async () => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER + "/api/equipment/" + userCtx.id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userCtx.accessToken,
          },
          body: JSON.stringify({ type, model, modification }),
        }
      );

      const data = await res.json();
      getEquipment();
      setType("");
      setModel("");
      setModification("");
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteEquipment = async (id) => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER + "/api/equipment/delete/" + id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userCtx.accessToken,
          },
        }
      );
      getEquipment(userCtx.id);
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateEquipment = async (id) => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER + "/api/equipment/update/" + id,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userCtx.accessToken,
          },
          body: JSON.stringify({ type, model, modification }),
        }
      );
      getEquipment(userCtx.id);
      setType("");
      setModel("");
      setModification("");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getName();
    getEquipment();
    setType("");
    setModel("");
    setModification("");
  }, []);

  return (
    <>
      <Navbar></Navbar>

      <div className={styles.container}>
        <h3>
          Good day, <span>{name}</span>!
        </h3>
        <div className={styles.yourEquipment}>
          <h5>Your Equipment</h5>
        </div>
        {/* <hr></hr> */}

        <div className={styles.equipmentDisplay}>
          {equipment.map((item) => {
            return (
              <Equipment
                key={item.equipment_id}
                equipment_id={item.equipment_id}
                equipment_type={item.equipment_type}
                equipment_model={item.equipment_model}
                equipment_modification={item.equipment_modification}
                // user_id={item.user_id}
                deleteEquipment={deleteEquipment}
                updateEquipment={updateEquipment}
                getEquipment={getEquipment}
                type={type}
                setType={setType}
                model={model}
                setModel={setModel}
                modification={modification}
                setModification={setModification}
              />
            );
          })}
        </div>

        <div className={styles.addEquipment}>
          <h5>Add Equipment</h5>
        </div>
        {/* <hr></hr> */}

        <div className="text-center">
          <select
            id="equipment"
            name="equipment"
            className="form-control my-3"
            defaultValue={""}
            onChange={(e) => setType(e.target.value)}
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
            placeholder="Model"
            className="form-control my-3"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="Modification"
            className="form-control my-3"
            value={modification}
            onChange={(e) => setModification(e.target.value)}
          ></input>

          <button
            // className="btn btn-success btn-block"
            className={styles.addButton}
            onClick={() => {
              addEquipment();
            }}
          >
            Add
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
