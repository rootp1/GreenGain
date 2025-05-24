import Header from "../components/header";
import { AuthContext } from "../contexts/authContext";
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Leaderboard() {
  const { isAuthenticated, user, loading, signup, login, logout } = useContext(AuthContext);
  
  const leaderboardData = [
    { rank: "#1", name: "Akash Keith", points: "2310", place: "🏆" },
    { rank: "#2", name: "Kristen Nikhil", points: "1605", place: "🥈" },
    { rank: "#3", name: "Rahul Sridhar", points: "930", place: "🥉" },
    { rank: "#4", name: "Mabel Helen", points: "620", place: "🌟" },
    { rank: "#5", name: "Samantha", points: "580", place: "🌟" },
    { rank: "#6", name: "Daniel Craig", points: "540", place: "🌟" },
    { rank: "#7", name: "Rebecca Smith", points: "500", place: "🌟" },
    { rank: "#8", name: "Ajith Kumar", points: "493", place: "🌟" },
    { rank: "#9", name: "Anush", points: "478", place: "🌟" },
    { rank: "#10", name: "Karan Sky", points: "486", place: "🌟" },
  ];

  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated) {
      navigate("/"); 
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Add conditional check for `user`
  if (!user) {
    return <div>Loading user data...</div>;
  }

  

  return (
    <div>
      <div className="leaderboard-container">
        <div className="user-card">
          <div className="profile-pic"></div>
          <h2 className="username" style={{color: "#000000"}}>{user.fullname}</h2>
          <p className="rank" id="myrank">
            RANK: #41
          </p>
          <p className="points">Total Points: {user.points}</p>
          <div className="stats-container">
            <h3 className="stats-title">STATS:</h3>
            <div className="stats">
              <ul>
                <li>Total No. Of Trees: 12</li>
                <li>Total Posts: 132</li>
                <li>Coins Earned: {user.points}</li>
                <li>Credits Earned: {user.credits}</li>
                <li>Carbon Sequestration</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="leaderboard-panel">
          <h2 className="leaderboard-title">🏆 Leaderboard</h2>
          <div className="leaderboard-header">
            <span className="header-item">S.No</span>
            <span className="header-item">Name</span>
            <span className="header-item">Points</span>
            <span className="header-item">Place</span>
          </div>
          <div className="leaderboard-list">
            {leaderboardData.map((entry, index) => (
              <div
                key={index}
                className={`leaderboard-entry ${
                  index === 0
                    ? "gold"
                    : index === 1
                    ? "silver"
                    : index === 2
                    ? "bronze"
                    : ""
                }`}
              >
                <span className="rank">{index + 1}</span>
                <span className="name">{entry.name}</span>
                <span className="points">{entry.points}</span>
                <span className="place">{entry.place}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
