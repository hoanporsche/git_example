import axios from 'axios';
import { baseUrl } from '../enviroment';
import { API_URL, MODEL_URL } from '../share/constant/api.constant';
import BaseService from '../share/util/BaseService';
import { LOCAL_STORAGE } from '../share/constant/local-storage.constant';
import { ROUTING_URL } from '../share/constant/routing.constant';

export const login = (email, password) => {
  return axios({
    method: 'post',
    url: `${baseUrl}${API_URL.LOGIN}`,
    data: `username=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&grant_type=password`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa('demo-clientid:demo-secret')
    }
  });
}

export const getInfo = () => {
  return BaseService.get(`${baseUrl}${API_URL.API}${MODEL_URL.USER}${API_URL.FIND_INFO}`)
}

export const logout = () => {
  localStorage.removeItem(LOCAL_STORAGE.TOKEN);
  localStorage.removeItem(LOCAL_STORAGE.CURRENT_USER);
  window.location.href = ROUTING_URL.LOGIN;
}

export const getTopRole = () => {
  const currentUser = JSON.parse(localStorage.getItem(LOCAL_STORAGE.CURRENT_USER));
  return currentUser ? currentUser.roles[0] : '';
}