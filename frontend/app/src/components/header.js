import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import { useContext, useState } from "react";
function Header() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [showPopover, setShowPopover] = useState(false);
  const togglePopover = () => setShowPopover((p) => !p);
  const handleLogout = () => { logout(); setShowPopover(false); };
  const baseBtn = "flex items-center gap-2 font-pixel text-lg text-black transition-transform hover:scale-125";
  return (
    <nav className="mx-auto mt-4 mb-8 w-11/12 max-w-5xl rounded-3xl bg-amber-300/80 backdrop-blur shadow-lg shadow-black/30 px-6 py-3 flex justify-around items-center">
      <Link to="/" className={baseBtn}>
        <img src="images/home.png" alt="Home" className="size-9" />
        <span>Home</span>
      </Link>
      <Link to="/tree" className={baseBtn}>
        <img src="images/tree.png" alt="My Plants" className="size-9" />
        <span>MyPlants</span>
      </Link>
      <Link to="/leaderboard" className={baseBtn}>
        <img src="images/trophy.png" alt="Leaderboard" className="size-9" />
        <span>Leaderboard</span>
      </Link>
      <Link to="/marketplace" className={baseBtn}>
        <img src="images/sun.png" alt="Marketplace" className="size-9" />
        <span>Marketplace</span>
      </Link>
      {!isAuthenticated ? (
        <Link to="/login" className={baseBtn}>Login/Signup</Link>
      ) : (
        <div className="relative">
          <button onClick={togglePopover} className={baseBtn + " focus:outline-none"}>
            <img src="images/person.png" alt="Profile" className="size-9" />
            <span>Profile</span>
          </button>
          {showPopover && (
            <div className="absolute right-0 mt-2 w-40 rounded-md border border-black bg-white p-2 shadow-xl">
              <button onClick={handleLogout} className="w-full rounded bg-black px-3 py-2 text-white text-sm font-medium hover:bg-neutral-800">Logout</button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
export default Header;
