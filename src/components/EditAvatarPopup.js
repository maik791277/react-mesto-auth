import PopupWithForm from "./PopupWithForm";
import InputPopup from "./InputPopup";
import React from "react";

function EditAvatarPopup(props) {
   const [avatar, setAvatar] = React.useState("")

   React.useEffect(() => {
      setAvatar("")
   }, [props.isOpen])

   function handleChangeAvatar(e) {
      setAvatar(e.target.value)
   }

   function handleSubmit(e) {
      e.preventDefault();

      props.onUpdateAvatar({
         avatar
      });
   }

   return (
   <PopupWithForm
      name="image-user"
      classNameForm="popup__form_image-user"
      title="Обновить аватар"
      button={<button className="popup__button" type="submit">Сохранить</button>}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
   >
         <InputPopup
            className="field_job"
            type="url"
            name="link"
            id="input-image-user"
            placeholder="Ссылка на картинку"
            value={avatar}
            onChange={handleChangeAvatar}
         />
   </PopupWithForm>
   );
}

export default EditAvatarPopup;