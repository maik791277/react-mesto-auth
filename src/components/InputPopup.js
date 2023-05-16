function InputPopup(props) {

   return(
      <label className="popup__field">
         <input className={`popup__input popup__input_${props.className} ${props.NewclassName}`}
                type={props.type}
                name={props.name}
                id={props.id}
                minLength={props.minLength}
                maxLength={props.maxLength}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
                required />
            <span className={`popup__input-error ${props.id}-error`}></span>
      </label>
   );
}

export default InputPopup;