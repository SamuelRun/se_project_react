import "./Header.css";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

function Header({
  handleAddClick,
  weatherData,
  handleRegisterModalClick,
  handleLoginModalClick,
  currentUser,
  isLoggedIn,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="header__logo" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />

      {isLoggedIn ? (
        <>
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add Clothes
          </button>
          <Link to="/profile" className="header__link">
            <div className="header__user-container">
              <p className="header__username">{currentUser.name}</p>
              <img
                src={currentUser.avatar}
                alt="user avatar"
                className="header__avatar"
              />
            </div>
          </Link>
        </>
      ) : (
        <>
          <button
            onClick={handleRegisterModalClick}
            type="button"
            className="sign-up-btn"
          >
            Sign Up
          </button>
          <button
            onClick={handleLoginModalClick}
            type="button"
            className="log-in-btn"
          >
            Log In
          </button>
        </>
      )}
    </header>
  );
}

export default Header;
