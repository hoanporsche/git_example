import $ from 'jquery';

export const setLoading = (enable) => {
  let body = $('body');
  if (enable) {
    $(body).addClass('m-page--loading-non-block')
  } else {
    $(body).removeClass('m-page--loading-non-block')
  }
}