import React ,{ useContext}from 'react';
import '../profile.css';
import { AuthContext } from "../contexts/authContext";

function Profile() {
    const { isAuthenticated, user, loading, signup, login, logout } = useContext(AuthContext);

    const pointinc=()=>{
    var inc=document.getElementById("pointinc");
    inc.innerHTML="114 🌞 Coins";
    var klaim=document.getElementById("claimed");
    klaim.innerHTML="Claimed";
    klaim.style.backgroundColor="grey";
  }
    return (
    <div className="profiles-container">
      <div className="profiles-header">
        <div className="profiles-info">
          <div className="avatar">
            <img src="images/akkaphoto.jpg"></img>
          </div>
          <div className="details">
            <h1>TreeCanFixMe</h1>
            <div className="badges">
              <div className="badge" id='flash'>Flash Flora 🌲</div>
              <div className="badge">Intermediate Planter 🌳</div>
            </div>
            <p>Email: Tree@gmail.com</p>
            <a href="#" className="add-bio">Add Bio</a>
          </div>
        </div>
        <div className="points">
          <h2 id='yourpoint'>YOUR POINTS</h2>
          <p id="pointinc">{user.points} 🌞 Coins</p>
          <p>0.2 💊 Carbon Credit</p>
        </div>
      </div>

      <div className="transaction-history">
        <h2>Transaction History</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Transaction ID</th>
              <th>Buyer Name</th>
              <th>Credits Purchased</th>
              <th>Certificate Transfer</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>12/1/25</td>
              <td>Ae123</td>
              <td>Stark Industries</td>
              <td>2 CC</td>
              <td><div className="status transferred">Transferred</div></td>
            </tr>
            <tr>
              <td>15/1/25</td>
              <td>Re179</td>
              <td>Vel Pvt. Lt.</td>
              <td>2 CC</td>
              <td><div className="status timed-out">Timed Out</div></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="quests">
        <h2 id='quest'>Quests</h2>
        <p>Note: complete these challenges to get Green currency</p>
        <div className="quest">
          <p className="quest-text">1. Plant your first tree</p>
          <p className="quest-reward">+10 💚 + Flash Flora 🌲</p>
          <button className="claim-btn" id='claimed' onClick={pointinc}>Claim</button>
        </div>
        <div className="quest">
          <p className="quest-text">2. Plant 3 different Trees</p>
          <p className="quest-reward">+10 💚 LOCKED</p>
          <button className="locked-btn" disabled>🔒</button>
        </div>
        <div className="quest">
          <p className="quest-text">3. Post 5 times</p>
          <p className="quest-reward">+10 💚 LOCKED</p>
          <button className="locked-btn" disabled>🔒</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;