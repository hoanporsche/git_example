import axios from 'axios';
import { baseUrl } from '../../../enviroment';
import { MODEL_URL, API_URL } from '../../../share/constant/api.constant';

const findAllItemUrl = baseUrl + MODEL_URL.ITEM + API_URL.FIND_ALL; 
const findAllCategoryUrl = baseUrl + MODEL_URL.CATEGORY + API_URL.FIND_ALL;
const findAllStoreUrl = baseUrl + MODEL_URL.STORE + API_URL.FIND_ALL;

export function findAllCategory() {
  return axios({
    method: 'GET',
    url: findAllCategoryUrl,
  })
}

export function findAllItem() {
  return axios({
    method: 'GET',
    url: findAllItemUrl,
  });
} 

export function findAllStore() {
  return axios({
    method: 'GET',
    url: findAllStoreUrl,
  });
} 