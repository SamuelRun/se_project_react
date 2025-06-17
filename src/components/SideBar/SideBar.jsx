import "./SideBar.css";

function SideBar({ currentUser, handleSignOut }) {
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
      <div>
        <button className="signout" type="button" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    </>
  );
}

export default SideBar;
