import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Header from "../Header";
import InputPopup from "../InputPopup";
import InfoTooltip from "../InfoTooltip";
import * as mestoAuth from "../../utils/mestoAuth"
import something from "../../images/Union (1).png"
import somethingIsWrong from "../../images/something-wrong.png"


function Register(props) {

   const [formValue, setFormValue] = useState({
      email: '',
      password: '',
      confirmPassword: ''
   })
   const [popupRegister, setPopupRegister] = useState({
      textPopup: '',
      imagePopup: ''
   })
   
   console.log(formValue)
   const [isInfoTooltip, setIsInfoTooltip] = useState(false)
   const navigate = useNavigate();

   function closeInfoTooltipClick() {
      setIsInfoTooltip(false)
   }

   function handleChange(e) {
      const {name, value} = e.target;
      setFormValue({
         ...formValue,
         [name]: value
      });
   }

   function handleSubmit(e) {
      e.preventDefault();

      if (formValue.password !== formValue.confirmPassword) {
         setPopupRegister({
            textPopup: 'Что-то пошло не так! Пароли не совпадают.',
            imagePopup: somethingIsWrong
         })

         setIsInfoTooltip(true)

      } else {
         const {email, password} = formValue;

         mestoAuth.register(email, password)
         .then(() => {
            setPopupRegister({
               textPopup: `Вы успешно зарегистрировались!`,
               imagePopup: something
            })
            setIsInfoTooltip(true)
            setTimeout(navigate, 3000, '/sign-in')
         })
         .catch((err) => {
            setPopupRegister({
               textPopup: `${err} Что-то пошло не так! Возможно у вас уже есть аккаунт. Попробуйте ещё раз.`,
               imagePopup: somethingIsWrong
            })
            setIsInfoTooltip(true)
         });
      }
   }


   return (
   <>
      <div className="page">
         <main className="content">
            <form className="authentication" name={props.name} onSubmit={handleSubmit}>
               <h2 className="authentication__title">Регистрация</h2>
               <InputPopup
               className="register_email"
               NewclassName="popup__input_black"
               type="email"
               name="email"
               id="register_email-input"
               minLength="2"
               maxLength="40"
               placeholder="Email"
               // value={name}
               onChange={handleChange}
               />
               <InputPopup
               className="register_password"
               NewclassName="popup__input_black"
               type="password"
               name="password"
               id="register_password-input"
               minLength="2"
               maxLength="40"
               placeholder="Пароль"
               onChange={handleChange}
               />
               <InputPopup
               className="register_confirmPassword"
               NewclassName="popup__input_black"
               type="password"
               name="confirmPassword"
               id="register_confirmPassword-input"
               minLength="2"
               maxLength="40"
               placeholder="Повторите пароль"
               onChange={handleChange}
               />
               <button className="authentication__button" type="submit">Зарегистрироваться</button>
               <h2 className="authentication__text">Уже зарегистрированы? <Link to="/sign-in">Войти</Link></h2>
            </form>
         </main>
      </div>
      <InfoTooltip isOpen={isInfoTooltip} onClose={closeInfoTooltipClick} image={popupRegister.imagePopup} text={popupRegister.textPopup} />
   </>
   );
}

export default Register;