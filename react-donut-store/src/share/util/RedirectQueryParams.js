/**
 * Dang params la 1 array vi du: { name: 'code', value: 'abc'}
 */
const RedirectQueryParams = (to, params) => {
  let url = `${to}?`;
  if (params.length > 0) {
    for (let i = 0; i < params.length; i++) {
      const suffix = (i === (params.length - 1)) ? '' : '&';
      if (params[i].value !== '') {
        url = url + params[i].name + '=' + params[i].value + suffix;
      }
    }
  }
  return url;
}

export default RedirectQueryParams;