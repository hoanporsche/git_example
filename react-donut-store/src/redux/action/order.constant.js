import { findListOrder } from '../../management/page/order/OrderApiCaller';
import * as Helper from '../../share/common/helper/Helper';

export const FETCH_LIST_ORDER = 'FETCH_LIST_ORDER';

export const fetListOrder = (params) => {
  return (dispatch) => {
    Helper.setLoading(true);
    return findListOrder(params).then(({ data }) => {
      console.log(data.content);
      dispatch(actFetchListOrder(data));
      Helper.setLoading(false);
    }).catch(error => {
      Helper.setLoading(false);
      console.log(error);
    });
  }
}

const actFetchListOrder = (content) => {
  return {
    type: FETCH_LIST_ORDER,
    content,
  }
}