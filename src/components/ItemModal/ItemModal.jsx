import "./ItemModal.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemModal({ activeModal, onClose, card, onDelete }) {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
        ></button>
        <img
          src={card.imageUrl}
          alt="clothing__image"
          className="modal__image"
        />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
          {currentUser ? (
            <button
              className="modal__delete-btn"
              onClick={() => onDelete(card._id)}
            >
              Delete item
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
