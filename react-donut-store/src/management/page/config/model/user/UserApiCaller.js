import BaseService from '../../../../../share/util/BaseService';
import { baseUrl } from '../../../../../enviroment';
import { API_URL, MODEL_URL } from '../../../../../share/constant/api.constant';

const changePasswordUrl = baseUrl + API_URL.API + MODEL_URL.USER + API_URL.CHANGE_PASSWORD;
const resetPasswordUrl = baseUrl + API_URL.API + MODEL_URL.USER + API_URL.RESET_PASSWORD;

export const changePassword = (oldPass, newPass) => {
  return BaseService.post(changePasswordUrl, {oldPassword: oldPass, newPassword: newPass});
}

export const resetPassword = (email) => {
  return BaseService.get(resetPasswordUrl, {email: email});
}