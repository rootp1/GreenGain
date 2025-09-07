import React from "react";
import Signup from "./pages/signup.js";
import Signin from "./pages/signin.js";
import Header from "./components/header.js";
import Home from "./pages/home.js";
import { Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";
import Leaderboard from "./pages/leaderboard.js";
import Tree from "./pages/tree.js";
import Marketplace from "./pages/marketplace.js";
import Profile from "./pages/profile.js";
function App() {
  const location = useLocation();
  const hideHeaderRoutes = ["/signup", "/login"]; 
  return (
    <>
      <AuthProvider>
        {!hideHeaderRoutes.includes(location.pathname) && <Header />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/tree" element={<Tree />} />
          <Route path="/marketplace" element={<Marketplace/>} />
          <Route path="/profile" element={<Profile/>} />
        </Routes>
      </AuthProvider>
    </>
  );
}
export default App;
