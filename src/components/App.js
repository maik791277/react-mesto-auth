import Main from "./Main";
import React, {useState, useEffect} from "react";
import {Routes, Route, Navigate, useNavigate, useLocation} from "react-router-dom";
import {api} from "../utils/Api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import Login from "./pages/Login";
import { ProtectedRoute } from "./ProtectedRoute";
import Register from "./pages/Register";
import PageNotFound from "./pages/PageNotFound";
import * as mestoAuth from "../utils/mestoAuth";
import Header from "./Header";


function App() {
   const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
   const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
   const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
   const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
   const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = useState(false);
   const [loggedIn, setLoggedIn] = useState(false);
   const [currentIdCard, setCurrentIdCard] = useState("");
   const [selectedCard, setSelectedCard] = useState({});
   const [currentUser, setCurrentUser] = useState([]);
   const [currentCard, setCurrentCard] = useState([]);
   const [userData, setUserData] = useState([]);
   const navigate = useNavigate()
   let location = useLocation();

   console.log(userData)
   useEffect(() => {
      api.getUserInformation()
      .then((data) => {
         setCurrentUser(data);
      })
      .catch((err) => alert(err));
   }, []);

   if (loggedIn){
      if (location.pathname === '/sign-up' || location.pathname === '/sign-in'){
         navigate('/main')
         console.log(location.pathname)
      }
   }

   function tokenCheck() {
      const jwt = localStorage.getItem('jwt')
      if (jwt) {
         mestoAuth.usersMe(jwt)
         .then((user) => {
            setUserData(user.data)
            setLoggedIn(true)
         })
         .catch((err) => alert(err));
      }
   }

   useEffect(() => {
      tokenCheck()
   }, [])

   useEffect(() => {
      api.getInitialCards()
      .then((data) => {
         setCurrentCard(data);
      })
      .catch((err) => alert(err));
   }, []);

   function handleCardLike(card) {
      const isLiked = card.likes.some((i) => i._id === currentUser._id);

      api.putCardLike(card._id, !isLiked)
      .then((newCard) => {
         setCurrentCard((state) =>
         state.map((c) => (c._id === card._id ? newCard : c))
         );
      })
      .catch((err) => alert(err));
   }

   function handleCardDelete(card) {
      api.deleteCard(card._id)
      .then(() => {
         setCurrentCard((state) => state.filter((c) => c._id !== card._id));
         closeAllPopups();
      })
      .catch((err) => alert(err));
   }

   function handleUpdateUser(data) {
      api.createUserInformation(data)
      .then((data) => {
         setCurrentUser(data);
         closeAllPopups();
      })
      .catch((err) => alert(err));
   }

   function handleUpdateAvatar(data) {
      api.createUserImage(data)
      .then((data) => {
         setCurrentUser(data);
         closeAllPopups();
      })
      .catch((err) => alert(err));
   }

   function handleUpdateCard(data) {
      api.createCard(data)
      .then((data) => {
         setCurrentCard([data, ...currentCard]);
         closeAllPopups();
      })
      .catch((err) => alert(err));
   }

   function handleEditAvatarClick() {
      setIsEditAvatarPopupOpen(true);
   }

   function handleEditProfileClick() {
      setIsEditProfilePopupOpen(true);
   }

   function handleAddPlaceClick() {
      setIsAddPlacePopupOpen(true);
   }

   function DeleteCardClick(asda) {
      setDeleteCardPopupOpen(true);
      setCurrentIdCard(asda)
   }

   function handleCardClick(card) {
      setSelectedCard(card);
      setIsImagePopupOpen(true);
   }

   function handleLogin() {
      setLoggedIn(true)
   }

   function closeAllPopups() {
      setIsEditAvatarPopupOpen(false);
      setIsEditProfilePopupOpen(false);
      setIsAddPlacePopupOpen(false);
      setIsImagePopupOpen(false);
      setDeleteCardPopupOpen(false)
   }

   return (
   <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
         <div className="page">
         <Header userData={userData} asdasd={setLoggedIn}/>
         </div>
         <Routes>
            <Route path="/main" element={<ProtectedRoute
            element={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            handleClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={DeleteCardClick}
            card={currentCard}
            isOpenEditProfile={isEditProfilePopupOpen}
            isOpenEditAvatar={isEditAvatarPopupOpen}
            isOpenAddPlace={isAddPlacePopupOpen}
            isOpenDeletePlace={isDeleteCardPopupOpen}
            isOpenImagePopup={isImagePopupOpen}
            onUpdateAvatarEditAvatar={handleUpdateAvatar}
            onUpdateCardAddPlace={handleUpdateCard}
            onCardDeleteDeletePlace={handleCardDelete}
            idCardDeletePlace={currentIdCard}
            cardImagePopup={selectedCard}
            onClosePopup={closeAllPopups}
            onUpdateUserEditProfile={handleUpdateUser}
            loggedIn={loggedIn}
            userData={userData}/>}
            />
            <Route path="/sign-in" element={<Login handleLogin={handleLogin} aaaa={tokenCheck}/>} />
            <Route path="/sign-up" element={<Register />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/" element={loggedIn ? <Navigate to='/main' /> : <Navigate to='/sign-in' />} />
         </Routes>

      </div>
   </CurrentUserContext.Provider>
   );
}

export default App;








