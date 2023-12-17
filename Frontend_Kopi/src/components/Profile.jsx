import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/user";
import Equipment from "./Equipment";

const Profile = () => {
  const [name, setName] = useState("");
  const [equipment, setEquipment] = useState([]);
  const userCtx = useContext(UserContext);
  console.log(equipment);

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
      const res = await fetch(import.meta.env.VITE_SERVER + "/api/equipment", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userCtx.accessToken,
        },
      });
      const data = await res.json();
      console.log(data);
      setEquipment(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const addEquipment = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_SERVER + "/api/equipment", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userCtx.accessToken,
        },
        body: JSON.stringify({ type, model, modification }),
      });
      const data = await res.json();
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // We want the page to useEffect when there is update to the state of equipment, but right now if I put the equipment state into the second argument, the console goes crazy.

  useEffect(() => {
    getName();
    getEquipment();
  }, []);

  return (
    <>
      <div className="text-left my-5 mx-5">
        <h3>Good day, {name}!</h3>
        <div className="text-center my-5 mx-5">
          <h5>Your Equipment</h5>
        </div>

        {equipment.map((item) => {
          return (
            <Equipment
              key={item.equipment_id}
              id={item.equipment_id}
              equipment_type={item.equipment_type}
              equipment_model={item.equipment_model}
              equipment_modification={item.equipment_modification}
            />
          );
        })}

        <div className="text-center my-5 mx-5">
          <h5>Add Equipment</h5>
        </div>
      </div>
    </>
  );
};

export default Profile;
