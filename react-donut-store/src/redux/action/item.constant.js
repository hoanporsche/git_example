import { findAllItem } from '../../main/page/util/api-caller';
import * as Helper from '../../share/common/helper/Helper';

export const FETCH_ITEM = 'FETCH_ITEM';

export const fetAllItem = () => {
  return (dispatch) => {
    Helper.setLoading(true);
    return findAllItem().then(({data}) => {
      dispatch(actFetchItem(data));
      Helper.setLoading(false);
    }).catch(error => console.log(error));
  }
}

const actFetchItem = (listItem) => {
  return {
    type : FETCH_ITEM,
    listItem,
  }
}