function ImagePopup(props) {
   return(
      <section className={`popup popup-image ${props.isOpen ? 'popup_opened' : ''}`}>
         <div className="popup-image__container">
            <button className="popup__close-button" type="button" onClick={props.onClose}/>
            <img className="popup-image__image" src={props.card.link} alt={props.card.name} />
            <p className="popup-image__title">{props.card.name}</p>
         </div>
      </section>
   );
}

export default ImagePopup;