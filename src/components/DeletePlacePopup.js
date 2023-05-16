import PopupWithForm from "./PopupWithForm";
import React from "react";

function DeletePlacePopup(props) {

   function handleDeleteClick(e) {
      e.preventDefault();

      props.onCardDelet(props.idCard)
   }

   return (
   <PopupWithForm
      name="delete"
      classNameForm="popup__form_popup-delete"
      title="Вы уверены"
      button={<button className="popup__button" type="submit">Да</button>}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleDeleteClick}
   />
   );
}

export default DeletePlacePopup