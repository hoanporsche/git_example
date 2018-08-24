import axios from 'axios';
import { baseUrl } from '../enviroment';
import { MODEL_URL, API_URL } from '../share/constant/api.constant';

const createOrderUrl = baseUrl + MODEL_URL.ORDER + API_URL.CREATE;

export function createOrder(newOrder) {
  return axios.post(createOrderUrl, newOrder);
}