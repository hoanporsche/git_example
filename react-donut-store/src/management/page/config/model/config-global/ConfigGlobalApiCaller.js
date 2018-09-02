import BaseService from '../../../../../share/util/BaseService';
import { baseUrl } from '../../../../../enviroment';
import { API_URL, MODEL_URL } from '../../../../../share/constant/api.constant';

const saveUrl = baseUrl + API_URL.API + MODEL_URL.CONFIG_GLOBAL + API_URL.SAVE;
const findAllUrl = baseUrl + API_URL.API + MODEL_URL.CONFIG_GLOBAL + API_URL.FIND_ALL;

export const save = (params) => {
  return BaseService.post(saveUrl, params);
}

export const findAllConfigGlobal = (params) => {
  return BaseService.get(findAllUrl, params);
}