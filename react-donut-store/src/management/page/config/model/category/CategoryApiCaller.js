import BaseSerivce from '../../../../../share/util/BaseService';
import { baseUrl } from '../../../../../enviroment';
import { API_URL, MODEL_URL } from '../../../../../share/constant/api.constant';

const findListUrl = baseUrl + API_URL.API + MODEL_URL.CATEGORY + API_URL.FIND_LIST;

export const findListCategory = (params) => {
  return BaseSerivce.get(findListUrl, params);
}