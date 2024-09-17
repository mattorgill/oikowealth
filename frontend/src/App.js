import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Login from "./pages/login";
import Home from "./pages/home";
import Registration from "./pages/registration"
import { useSessionContext } from "./context/SessionContext";

function App() {

  const [authenticated, setAuthenticated] = useState(false);
  // const [loading, setLoading] = useState(true);
  const {checkSession} = useSessionContext();

  const handleAuthentication = async () => {
    const isAuthenticated = await checkSession();
    if (isAuthenticated !== authenticated) {
      setAuthenticated(isAuthenticated);
    }
  };

  useEffect(() => {
    handleAuthentication();

    const intervalId = setInterval(() => {
      handleAuthentication();
    }, 60000 * 1); // 1 min

    return () => clearInterval(intervalId);
    // setLoading(false)
  }, [checkSession, authenticated]);



  // if (loading) {
  //   return (<div>Loading...</div>)
  // }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!authenticated ? <Login onLogin={handleAuthentication}/> : <Navigate to="/home"/>} />
        <Route path="/register" element={!authenticated ? <Registration onRegister={handleAuthentication}/> : <Navigate to="/home"/>} />
        <Route path="/home" element={authenticated ? <Home onSignout={handleAuthentication}/> : <Navigate to="/login" />} />
        <Route path="/" element={authenticated ? <Home onSignout={handleAuthentication}/> : <Navigate to="/login"/>} />
      </Routes>
    </Router>
  )

}

export default App;
