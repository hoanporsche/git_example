import { baseUrl } from "../../../enviroment";
import { CHAT_URL, API_URL, MODEL_URL } from "../../../share/constant/api.constant";
import BaseService from '../../../share/util/BaseService';

const findListUrl = baseUrl + API_URL.API + MODEL_URL.NOTIFICATION + API_URL.FIND_LIST;
const userHasSeenUrl = baseUrl + API_URL.API + MODEL_URL.NOTIFICATION + API_URL.USER_HAS_SEEN;
export const notificationUrl = baseUrl + CHAT_URL.NOTIFICATION;
export const subcriceUrl = CHAT_URL.TOPIC_NOTIFICATION;

export const findList = () => {
  return BaseService.get(findListUrl, {
    size: 10,
    sort: 'id,desc'
  });
}

export const userHasSeen = (params) => {
  return BaseService.get(userHasSeenUrl, params);
}

export const elapsedTime = (value) => {
  const current = new Date().valueOf();
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const elapsed = current - value;

  if (elapsed < msPerMinute) {
    return ' Just a minute ago';
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + ' minutes ago';
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + ' hours ago';
  } else if (elapsed < msPerMonth) {
    return 'about ' + Math.round(elapsed / msPerDay) + ' days ago';
  } else if (elapsed < msPerYear) {
    return 'about ' + Math.round(elapsed / msPerMonth) + ' months ago';
  } else {
    console.log('inside the if condition', elapsed);
    return 'about ' + Math.round(elapsed / msPerYear) + ' years ago';
  }
}
