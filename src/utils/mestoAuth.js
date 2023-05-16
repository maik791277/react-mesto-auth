export const BASE_URL = 'https://auth.nomoreparties.co'

export const register = (email, password) => {
   return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify({
         "password": password,
         "email": email
      })
   })
   .then(res => res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`));
};


export const authorize = (email, password) => {
   return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify({
         "password": password,
         "email": email
      })
   })
   .then(res => res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`));
};

export const usersMe = (jwtUser) => {
   return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
         "Content-Type": "application/json",
         "Authorization" : `Bearer ${jwtUser}`
      },
   })
   .then(res => res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`));
}