import "./ItemCard.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function ItemCard({ item, onCardClick, onCardLike }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  const isLiked = currentUser
    ? item.likes.some((id) => id === currentUser._id)
    : null;
  const handleLike = () => {
    const id = item._id;
    onCardLike({ id, isLiked });
  };
  const { currentUser } = useContext(CurrentUserContext);

  const itemLikeButtonClassName = isLiked
    ? "card__like card__like_active"
    : "card__like";
  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      {currentUser ? (
        <button
          className={itemLikeButtonClassName}
          onClick={handleLike}
        ></button>
      ) : (
        <></>
      )}
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
