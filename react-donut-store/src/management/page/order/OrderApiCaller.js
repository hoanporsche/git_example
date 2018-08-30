import BaseService from '../../../share/util/BaseService';
import { API_URL, MODEL_URL } from '../../../share/constant/api.constant';
import { baseUrl } from '../../../enviroment';

const findListOrderUrl = baseUrl + API_URL.API + MODEL_URL.ORDER + API_URL.FIND_LIST;
const changeStatusUrl = baseUrl + API_URL.API + MODEL_URL.ORDER + "/change-status";
const saveUrl = baseUrl + API_URL.API + MODEL_URL.ORDER + API_URL.SAVE;

export const findListOrder = (params) => {
  return BaseService.get(findListOrderUrl, params);
}

export const changeStatus = (params) => {
  return BaseService.get(changeStatusUrl, params);
}

export const save = (params) => {
  return BaseService.post(saveUrl, params);
}