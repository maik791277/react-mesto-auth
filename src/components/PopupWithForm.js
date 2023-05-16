function PopupWithForm(props) {

   return(
      <section className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
         <form className={`popup__form ${props.classNameForm}`} name={props.name} onSubmit={props.onSubmit}>
            <button className="popup__close-button" type="button" onClick={props.onClose} />
            <h2 className="popup__title">{props.title}</h2>
               {props.children}
               {props.button}
         </form>
      </section>
   );
}
// popup__button_type_error это класс для деактивация кнопки сабмит на будущие

export default PopupWithForm;