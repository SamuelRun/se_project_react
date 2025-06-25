import { useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./App.css";
import { cordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import Footer from "../Footer/Footer";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { Routes, Route } from "react-router-dom";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import {
  addItem,
  deleteItem,
  getItems,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import {
  signUp,
  signIn,
  editProfile,
  verifyToken,
} from "../../utils/middlewares/auth";
import ProtectedRoute from "../../components/ProtectedRoute";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });

  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleSignOut = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
  };

  const handleToggleLoggedIn = () => {
    const token = localStorage.getItem("jwt");
    if (token) {
      verifyToken(token)
        .then((user) => {
          setIsLoggedIn(true);
          setCurrentUser(user);
        })
        .catch(console.error);
    }
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleRegisterModalClick = () => {
    setActiveModal("register");
  };

  const handleLoginModalClick = () => {
    setActiveModal("log-in");
  };

  const handleEditProfileModalClick = () => {
    setActiveModal("edit-profile");
  };

  const handleModalSwitch = () => {
    if (activeModal === "log-in") {
      setActiveModal("register");
    } else if (activeModal === "register") {
      setActiveModal("log-in");
    }
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleItemDelete = (_id) => {
    const token = localStorage.getItem("jwt");
    deleteItem(_id, token)
      .then(() => {
        setClothingItems(clothingItems.filter((item) => item._id !== _id));
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleAddItemModalSubmit = ({ _id, name, weather, imageUrl }) => {
    const token = localStorage.getItem("jwt");
    addItem({ _id, name, imageUrl, weather, token })
      .then((res) => {
        setClothingItems((prevItems) => [res, ...prevItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleRegisterModalSubmit = ({ name, avatar, email, password }) => {
    signUp({ name, avatar, email, password })
      .then(() => {
        return signIn({ email, password });
      })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        return verifyToken(data.token);
      })
      .then((user) => {
        setIsLoggedIn(true);
        setCurrentUser(user);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleLoginModalSubmit = ({ email, password }) => {
    return signIn({ email, password })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        return verifyToken(data.token);
      })
      .then((user) => {
        setIsLoggedIn(true);
        setCurrentUser(user);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleEditProfileSubmit = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    editProfile(name, avatar, token)
      .then((user) => {
        setCurrentUser(user);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleCardLike = ({ id, isLiked }) => {
    console.log("onCardLike called with:", { id, isLiked });
    const token = localStorage.getItem("jwt");
    !isLiked
      ? addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
  };

  useEffect(() => {
    getWeather(cordinates, APIkey)
      .then((data) => {
        const filterData = filterWeatherData(data);
        setWeatherData(filterData);
      })
      .catch(console.error);

    handleToggleLoggedIn();

    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
              handleRegisterModalClick={handleRegisterModalClick}
              handleLoginModalClick={handleLoginModalClick}
              handleModalSwitch={handleModalSwitch}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      onCardLike={handleCardLike}
                      handleSignOut={handleSignOut}
                      handleEditProfileModalClick={handleEditProfileModalClick}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
          <Footer />
          <AddItemModal
            activeModal={activeModal}
            onClose={closeActiveModal}
            isOpen={activeModal === "add-garment"}
            onAddItemModalSubmit={handleAddItemModalSubmit}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            onDelete={handleItemDelete}
          />
          <LoginModal
            isOpen={activeModal === "log-in"}
            activeModal={activeModal}
            onClose={closeActiveModal}
            onLoginModalSubmit={handleLoginModalSubmit}
            handleModalSwitch={handleModalSwitch}
          />
          <RegisterModal
            isOpen={activeModal === "register"}
            activeModal={activeModal}
            onClose={closeActiveModal}
            onRegisterModalSubmit={handleRegisterModalSubmit}
            handleModalSwitch={handleModalSwitch}
          />
          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            activeModal={activeModal}
            onClose={closeActiveModal}
            onEditProfileModalSubmit={handleEditProfileSubmit}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
