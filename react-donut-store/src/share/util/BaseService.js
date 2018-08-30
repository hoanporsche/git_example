import { LOCAL_STORAGE } from '../constant/local-storage.constant';
import axios from 'axios';

const BaseSerivce = Object.freeze({
  get: (url, data) => {
    return axios({
      method: 'GET',
      url: url,
      params: data,
      headers: createHeader(),
    });
  },
  post: (url, data) => {
    return axios({
      method: 'POST',
      url: url,
      data: data,
      headers: createHeader(),
    });
  }
})

const createHeader = () => {
  return {
    'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem(LOCAL_STORAGE.TOKEN))
  }
}

export default BaseSerivce;