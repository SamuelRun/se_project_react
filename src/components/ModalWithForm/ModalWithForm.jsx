import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  onSubmit,
  buttonSwitchText,
  handleModalSwitch,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close" />
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <div className="modal__buttons">
            <button type="submit" className="modal__submit">
              {buttonText}
            </button>
            <button
              type="button"
              className="modal__switch"
              onClick={handleModalSwitch}
            >
              {buttonSwitchText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
