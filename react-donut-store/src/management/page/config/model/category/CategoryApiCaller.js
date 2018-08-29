import BaseSerivce from '../../../../../share/util/BaseService';
import { baseUrl } from '../../../../../enviroment';
import { API_URL, MODEL_URL } from '../../../../../share/constant/api.constant';

const findListUrl = baseUrl + API_URL.API + MODEL_URL.CATEGORY + API_URL.FIND_LIST;
const showOrNotUrl = baseUrl + API_URL.API + MODEL_URL.CATEGORY + API_URL.ENABLED_OR_NOT;
export const findListCategory = (params) => {
  return BaseSerivce.get(findListUrl, params);
}

export const showOrNot = (id) => {
  return BaseSerivce.get(showOrNotUrl, {id: id});
}