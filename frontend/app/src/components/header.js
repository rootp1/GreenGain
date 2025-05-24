import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import { useContext, useState } from "react";

function Header() {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const [showPopover, setShowPopover] = useState(false);

  const togglePopover = () => {
    setShowPopover((prev) => !prev); // Toggle popover visibility
  };

  const handleLogout = () => {
    logout(); // Call the logout function
    setShowPopover(false); // Hide the popover after logout
  };

  return (
    <div className="navbar">
      
      <Link to="/"><div className="navbar-component">
        <img src="images/home.png" alt="Home" />
        <p>Home</p>
      </div></Link>
      <Link to="/tree"><div className="navbar-component">
        <img src="images/tree.png" alt="My Plants" />
        <p>MyPlants</p>
      </div></Link>
      <Link to="/leaderboard"><div className="navbar-component">
        <img src="images/trophy.png" alt="Leaderboard" />
        <p>Leaderboard</p>
      </div></Link>
      <Link to="/marketplace"><div className="navbar-component">
        <img src="images/sun.png" alt="Marketplace" />
        <p>Marketplace</p>
      </div></Link>

      {!isAuthenticated ? (
        <Link to="/login">
          <div className="navbar-component">
            <p>Login/Signup</p>
          </div>
        </Link>
      ) : (
        <Link to="/profile"><div className="navbar-component profile-container">
          <img
            src="images/person.png"
            alt="Profile"
            onClick={togglePopover}
            style={{ cursor: "pointer" }}
          />
          <p onClick={togglePopover} style={{ cursor: "pointer" }}>
            Profile
          </p>
          {showPopover && (
            <div className="popover">
              <button className="popbutton" onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
        </Link>
      )}
    </div>
    
  );
}

export default Header;
