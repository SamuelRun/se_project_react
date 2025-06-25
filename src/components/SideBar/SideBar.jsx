import "./SideBar.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function SideBar({ handleSignOut, handleEditProfileModalClick }) {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <>
      <div className="sidebar">
        <img
          className="sidebar__avatar"
          src={currentUser.avatar}
          alt="Default avatar"
        />
        <p className="sidebar__username">{currentUser.name}</p>
      </div>
      <div className="buttons">
        <button
          className="edit-profile"
          type="button"
          onClick={handleEditProfileModalClick}
        >
          Edit Profile
        </button>
        <button className="signout" type="button" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    </>
  );
}

export default SideBar;
