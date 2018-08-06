import axios from 'axios';
import baseUrl from '../../../enviroment';
import { MODEL_URL, API_URL } from '../../../share/constant/api.constant';

const findAllItemUrl = baseUrl + MODEL_URL.ITEM + API_URL.FIND_ALL; 

export function findAllItem() {
  return axios({
    method: 'GET',
    url: findAllItemUrl,
  });
} 