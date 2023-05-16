import Header from "../Header";
import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import InputPopup from "../InputPopup";
import somethingIsWrong from "../../images/something-wrong.png"
import InfoTooltip from "../InfoTooltip";
import * as mestoAuth from "../../utils/mestoAuth";

function Login(props) {

   const [formValue, setFormValue] = useState({
      email: '',
      password: '',
   })
   const [popupRegister, setPopupRegister] = useState({
      textPopup: '',
      imagePopup: ''
   })
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
      e.preventDefault()

      if (!formValue.email || !formValue.password) {
         setPopupRegister({
            textPopup: 'Что-то пошло не так! Поля не заполнены.',
            imagePopup: somethingIsWrong
         })

         setIsInfoTooltip(true)

      }else {
         const {email, password} = formValue;
         mestoAuth.authorize(email, password)
         .then((data) => {
            if (data.token){
               localStorage.setItem('jwt', data.token)
               props.handleLogin();
               navigate('/main')
               props.aaaa()
            }
         })
         .catch((err) => {
            if (err === 'Ошибка 401') {
               setPopupRegister({
                  textPopup: `${err} Что-то пошло не так! пользователь с email не найден или неправильный пароль.`,
                  imagePopup: somethingIsWrong
               })
               setIsInfoTooltip(true)
            }
            if (err === 'Ошибка 400') {
               setPopupRegister({
                  textPopup: `${err} Что-то пошло не так! Поля не заполнены.`,
                  imagePopup: somethingIsWrong
               })
               setIsInfoTooltip(true)
            }
         });
      }

   }

   return(
   <>
      <div className="page">
         <main className="content">
            <form className="authentication" name={props.name} onSubmit={handleSubmit}>
               <h2 className="authentication__title">Вход</h2>
               <InputPopup
               className="login_email"
               NewclassName="popup__input_black"
               type="email"
               name="email"
               id="login_email-input"
               minLength="2"
               maxLength="40"
               placeholder="Email"
               onChange={handleChange}
               />
               <InputPopup
               className="login_password"
               NewclassName="popup__input_black"
               type="password"
               name="password"
               id="login_password-input"
               minLength="2"
               maxLength="40"
               placeholder="Пароль"
               onChange={handleChange}
               />
               <button className="authentication__button" type="submit">Войти</button>
            </form>
         </main>
      </div>
      <InfoTooltip isOpen={isInfoTooltip} onClose={closeInfoTooltipClick} image={popupRegister.imagePopup} text={popupRegister.textPopup} />
   </>
   );
}

export default Login;