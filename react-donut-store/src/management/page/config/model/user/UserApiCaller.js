import BaseService from '../../../../../share/util/BaseService';
import { baseUrl } from '../../../../../enviroment';
import { API_URL, MODEL_URL } from '../../../../../share/constant/api.constant';

const findListUrl = baseUrl + API_URL.API + MODEL_URL.USER + API_URL.FIND_LIST;
const showOrNotUrl = baseUrl + API_URL.API + MODEL_URL.USER + API_URL.ENABLED_OR_NOT;
const saveUrl = baseUrl + API_URL.API + MODEL_URL.USER + API_URL.SAVE;
const changePasswordUrl = baseUrl + API_URL.API + MODEL_URL.USER + API_URL.CHANGE_PASSWORD;
const resetPasswordUrl = baseUrl + API_URL.API + MODEL_URL.USER + API_URL.RESET_PASSWORD;

export const findListUser = (params) => {
  return BaseService.get(findListUrl, params);
}

export const showOrNot = (id) => {
  return BaseService.get(showOrNotUrl, { id: id });
}

export const save = (params) => {
  return BaseService.post(saveUrl, params);
}

export const changePassword = (oldPass, newPass, logoutAll) => {
  return BaseService.post(changePasswordUrl, { oldPassword: oldPass, newPassword: newPass, logoutAll: logoutAll });
}

export const resetPassword = (email) => {
  return BaseService.get(resetPasswordUrl, { email: email });
}