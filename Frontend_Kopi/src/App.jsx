import React, { useEffect, useState, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import UserContext from "./context/user";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Profile from "./components/Profile";
// import Add from ",/components/Add";
// import Log from "./components/Log";

function App() {
  const [showLogin, setShowLogin] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const userCtx = useContext(UserContext);
  const [accessToken, setAccessToken] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  // const checkAuthenticated = async () => {
  //   try {
  //     const res = await fetch(import.meta.env.VITE_SERVER + "/auth/verify", {
  //       mathod: "GET",
  //       headers: {
  //         Authentication: "Bearer " + userCtx.accessToken,
  //       },
  //     });
  //     const data = await res.json();
  //     data === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  const setAuthentication = (boolean) => {
    setIsAuthenticated(boolean);
  };

  // useEffect(() => {
  //   checkAuthenticated();
  // }, []);

  return (
    <>
      <UserContext.Provider
        value={{
          accessToken,
          setAccessToken,
          id,
          setId,
          name,
          setName,
          email,
          setEmail,
          password,
          setPassword,
          role,
          setRole,
        }}
      >
        {/* <Router>
          <Routes>
            <Route
              path="/login"
              element={
                <Login
                  setShowLogin={setShowLogin}
                  setAuthentication={setAuthentication}
                />
              }
              render={(props) =>
                !isAuthenticated ? (
                  <Login
                    {...props}
                    setShowLogin={setShowLogin}
                    setAuthentication={setAuthentication}
                  />
                ) : (
                  <Navigate to="/profile" />
                )
              }
            />

            <Route
              path="/registration"
              element={
                <Registration
                  setShowLogin={setShowLogin}
                  setAuthentication={setAuthentication}
                />
              }
              render={(props) =>
                !isAuthenticated ? (
                  <Registration
                    {...props}
                    setShowLogin={setShowLogin}
                    setAuthentication={setAuthentication}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/profile"
              element={
                <Profile
                  setShowLogin={setShowLogin}
                  setAuthentication={setAuthentication}
                />
              }
              render={(props) =>
                isAuthenticated ? (
                  <Profile
                    {...props}
                    setShowLogin={setShowLogin}
                    setAuthentication={setAuthentication}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </Router> */}

        {!isAuthenticated && showLogin && (
          <Login
            setShowLogin={setShowLogin}
            setAuthentication={setAuthentication}
          />
        )}
        {!isAuthenticated && !showLogin && (
          <Registration
            setShowLogin={setShowLogin}
            setAuthentication={setAuthentication}
          />
        )}
        {isAuthenticated && <Profile setAuthentication={setAuthentication} />}
      </UserContext.Provider>
    </>
  );
}

export default App;
