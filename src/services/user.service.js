import axios from 'axios';
import authHeader from "./auth.header";

const URL = 'http://localhost:8080/api/test/';

export const getAdminBoard = () => {
    return axios.get(URL + 'admin', {
        headers: authHeader()
    })
};
export const getPublicContent = () => {
    return axios.get(URL + 'all');
};

export const getUserBoard = () => {
    return axios.get(URL + 'user', {
        headers: authHeader()
    })
};

export const getModeratorBoard = () => {
    return axios.get(URL + 'moderator', {
        headers: authHeader()
    })
};


