import $ from 'jquery';
import { ROUTING_URL } from '../../constant/routing.constant';

export const setLoading = (enable) => {
  let body = $('body');
  if (enable) {
    $(body).addClass('m-page--loading-non-block')
  } else {
    $(body).removeClass('m-page--loading-non-block')
  }
}

export const validateResponse = (response) => {
  if (response.status === 401) {
    localStorage.clear();
    window.location.href = ROUTING_URL.LOGIN;
  }
}
export const catchError = response => {
  alert(response ? JSON.parse(response).data : 'Something went wrongs!');
}