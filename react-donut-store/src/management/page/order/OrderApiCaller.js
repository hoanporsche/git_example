import BaseService from '../../../share/util/BaseService';
import { API_URL, MODEL_URL } from '../../../share/constant/api.constant';
import { baseUrl } from '../../../enviroment';

const findListOrderUrl = baseUrl + API_URL.API + MODEL_URL.ORDER + API_URL.FIND_LIST;

export const findListOrder = (params) => {
  return BaseService.get(findListOrderUrl, params);
}