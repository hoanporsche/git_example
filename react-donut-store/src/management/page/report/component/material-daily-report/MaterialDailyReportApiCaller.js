import BaseService from '../../../../../share/util/BaseService';
import { baseUrl } from '../../../../../enviroment';
import { API_URL, MODEL_URL } from '../../../../../share/constant/api.constant';

const findListUrl = baseUrl + API_URL.API + MODEL_URL.MATERIAL_DAILY_REPORT + API_URL.FIND_LIST;

export const findList = (params) => {
  return BaseService.get(findListUrl, params);
}