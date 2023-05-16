import PopupWithForm from "./PopupWithForm";
import InputPopup from "./InputPopup";
import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {

   const currentUser = React.useContext(CurrentUserContext)
   const [name, setName] = React.useState("")
   const [description, setDescription] = React.useState("")

   React.useEffect(() => {
      setName(`${currentUser.name}`);
      setDescription(`${currentUser.about}`);
   }, [props.isOpen]);

   function handleChangeName(e) {
      setName(e.target.value)
   }

   function handleChangeDescription(e) {
      setDescription(e.target.value)
   }

   function handleSubmit(e) {
      e.preventDefault();

      props.onUpdateUser({
         name,
         about: description,
      });
   }

   return (
   <PopupWithForm
      name="user-title"
      title="Редактировать профиль"
      button={<button className="popup__button" type="submit">Сохранить</button>}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}>
         <InputPopup
            className="field_name"
            type="text"
            name="name"
            id="profile-name-input"
            minLength="2"
            maxLength="40"
            placeholder="Имя фамилия"
            value={name}
            onChange={handleChangeName}
         />
         <InputPopup
            className="field_job"
            type="text"
            name="aboutUser"
            id="profile-job-input"
            minLength="2"
            maxLength="200"
            placeholder="Кем работаете"
            value={description}
            onChange={handleChangeDescription}
         />
   </PopupWithForm>
   );
}

export default EditProfilePopup;