import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Registration from "./components/Registration";
import Login from "./components/Login";
import Profile from "./components/Profile";
// import Add from ",/components/Add";
// import Log from "./components/Log";
import UserContext from "./context/user";

function App() {
  const [showLogin, setShowLogin] = useState(true);
  const [accessToken, setAccessToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  return (
    <>
      <UserContext.Provider
        value={{
          accessToken,
          setAccessToken,
          email,
          setEmail,
          password,
          setPassword,
          role,
          setRole,
        }}
      >
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                accessToken.length === 0 &&
                showLogin && <Login setShowLogin={setShowLogin} />
              }
            />
            <Route
              path="/registration"
              element={
                accessToken.length === 0 &&
                !showLogin && <Registration setShowLogin={setShowLogin} />
              }
            />
            <Route path="/profile" element={accessToken > 0 && <Profile />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </>
  );
}

export default App;
