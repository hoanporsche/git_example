import BaseService from '../../../../../share/util/BaseService';
import { baseUrl } from '../../../../../enviroment';
import { API_URL, MODEL_URL } from '../../../../../share/constant/api.constant';

const findAllUrl = baseUrl + API_URL.API + MODEL_URL.ORDER_STATUS + API_URL.FIND_ALL;

export const fetchAll = () => {
  return BaseService.get(findAllUrl, {});
}