import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({
  handleCardClick,
  clothingItems,
  handleAddClick,
  onCardLike,
  currentUser,
}) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__top">
        <p>Your items</p>
        <button className="clothes-section__button" onClick={handleAddClick}>
          + Add new
        </button>
      </div>
      <ul className="clothes-section__items">
        {clothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
              onCardLike={onCardLike}
              currentUser={currentUser}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
