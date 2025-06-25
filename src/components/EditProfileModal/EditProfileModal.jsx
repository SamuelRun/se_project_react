import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useState, useEffect, useContext } from "react";

function EditProfileModal({
  onClose,
  isOpen,
  activeModal,
  onEditProfileModalSubmit,
}) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const { currentUser } = useContext(CurrentUserContext);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  useEffect(() => {
    if (currentUser) setName(currentUser.name || "");
    if (currentUser) setAvatar(currentUser.avatar || "");
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditProfileModalSubmit({ name, avatar });
  };

  return (
    <ModalWithForm
      title="Edit Profile"
      buttonText="Submit"
      activeModal={activeModal}
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="edit-name"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          onChange={handleNameChange}
          value={name}
        />
      </label>
      <label htmlFor="avatar" className="modal__label">
        Image{" "}
        <input
          type="text"
          className="modal__input"
          id="edit-avatar"
          placeholder="Image URL"
          required
          onChange={handleAvatarChange}
          value={avatar}
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
