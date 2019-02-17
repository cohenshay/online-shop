// import { firebase, googleAuthProvider } from '../firebase/firebase';

import axios from 'axios';

export const signin = (params) => {
  let data = {
    email: params.email,
    password: params.password
  };

  return function (dispatch) {
    axios.post(`http://localhost:5000/auth/signin`, data)
      .then((response) => {
        
        //set token to local storage so when refreshing the app won't need to login again
        localStorage.setItem('clientToken', response.data.token);
        localStorage.setItem('currentUser', JSON.stringify(response.data.user));
        return dispatch({
          type: 'LOGIN',
          uid: response.data.token,
          currentUser: response.data.user
        })
      }).catch((err) => console.log(err))
  }
}

export const logout = () => {
  localStorage.removeItem('clientToken');
  localStorage.removeItem('currentUser');
  window.location.href = process.env.SITE_URL
  return function (dispatch) {
    return dispatch({
      type: 'LOGOUT'
    })
  }
}

export const refreshToken = () => {
  const clientToken = localStorage.getItem("clientToken");
  return dispatch({
    type: 'REFRESH_TOKEN',
    uid: clientToken,
  })
}

