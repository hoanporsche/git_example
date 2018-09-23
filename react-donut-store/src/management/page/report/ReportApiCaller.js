import BaseService from '../../../share/util/BaseService';
import { baseUrl } from '../../../enviroment';
import { MODEL_URL, API_URL } from '../../../share/constant/api.constant';

const findCountingInfoUrl = baseUrl + API_URL.API + MODEL_URL.REPORT + MODEL_URL.ORDER + API_URL.COUNTING_INFO; 

export const findCoutingInfo = (params) => {
  return BaseService.get(findCountingInfoUrl, params);
}