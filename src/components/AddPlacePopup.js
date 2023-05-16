import PopupWithForm from "./PopupWithForm";
import InputPopup from "./InputPopup";
import React from "react";

function AddPlacePopup(props) {
   const [nameCard, setNameCard] = React.useState("");
   const [linkCard, setLinkCard] = React.useState("");

   React.useEffect(() => {
      setNameCard("");
      setLinkCard("");
   }, [props.isOpen]);

   function handleChangeNameCard(e) {
      setNameCard(e.target.value);
   }

   function handleChangeLinkCard(e) {
      setLinkCard(e.target.value);
   }

   function handleSubmit(e) {
      e.preventDefault();

      props.onUpdateCard({
         name: nameCard,
         link: linkCard,
      });
   }

   return (
   <PopupWithForm
      name="user-card"
      title="Новое место"
      button={<button className="popup__button" type="submit">Сохранить</button>}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
   >
      <InputPopup
         className="field_name"
         type="text"
         name="name"
         id="card-name-input"
         minLength="2"
         maxLength="30"
         placeholder="Название"
         value={nameCard}
         onChange={handleChangeNameCard}
      />
      <InputPopup
         className="field_job"
         type="url"
         name="link"
         id="card-job-input"
         placeholder="Ссылка на картинку"
         value={linkCard}
         onChange={handleChangeLinkCard}
      />
   </PopupWithForm>
   );
}

export default AddPlacePopup;
