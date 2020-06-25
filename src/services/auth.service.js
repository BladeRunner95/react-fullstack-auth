import axios from 'axios';

const URL = 'http://localhost:8080/api/auth/';

export const auth = (username, email, password) => {
  return axios.post(URL + 'signup', {
      username: username,
      email: email,
      password: password
  })
};

export const login = (username, password) => {
    return axios.post(URL + 'signin', {
        username: username,
        password: password
    }).then(res => {
        if (res.data.accessToken) {
            localStorage.setItem('user', JSON.stringify(res.data))
        }
        return res.data;
    })
};

export const logout = () => {
    localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};