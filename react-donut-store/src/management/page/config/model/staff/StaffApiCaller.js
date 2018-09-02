import BaseService from '../../../../../share/util/BaseService';
import { baseUrl } from '../../../../../enviroment';
import { API_URL, MODEL_URL } from '../../../../../share/constant/api.constant';

const findListUrl = baseUrl + API_URL.API + MODEL_URL.STAFF + API_URL.FIND_LIST;
const showOrNotUrl = baseUrl + API_URL.API + MODEL_URL.STAFF + API_URL.ENABLED_OR_NOT;
const saveUrl = baseUrl + API_URL.API + MODEL_URL.STAFF + API_URL.SAVE;

export const findListStaff = (params) => {
  return BaseService.get(findListUrl, params);
}

export const showOrNot = (id) => {
  return BaseService.get(showOrNotUrl, {id: id});
}

export const save = (params) => {
  return BaseService.post(saveUrl, params);
}