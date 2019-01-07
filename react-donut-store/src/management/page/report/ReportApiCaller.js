import BaseService from '../../../share/util/BaseService';
import { baseUrl } from '../../../enviroment';
import { MODEL_URL, API_URL } from '../../../share/constant/api.constant';

const findOrderCountingInfoUrl = baseUrl + API_URL.API + MODEL_URL.REPORT + MODEL_URL.ORDER + API_URL.COUNTING_INFO;
const findOrderListUrl = baseUrl + API_URL.API + MODEL_URL.REPORT + MODEL_URL.ORDER + API_URL.FIND_LIST;
const findMaterialCountingInfoUrl = baseUrl + API_URL.API + MODEL_URL.REPORT + MODEL_URL.MATERIAL + API_URL.COUNTING_INFO;
export const findCoutingInfo = (params) => {
  return BaseService.get(findOrderCountingInfoUrl, params);
}
export const findOrderList = (params) => {
  return BaseService.get(findOrderListUrl, params);
}
export const findCoutingMaterialIn = (params) => {
  return BaseService.get(findMaterialCountingInfoUrl, params);
}