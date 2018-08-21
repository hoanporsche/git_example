import { findAllItem } from '../../main/page/util/api-caller';
import { Helper } from '../../share/common/loader/Loader';

export const FETCH_ITEM = 'FETCH_ITEM';

export const fetAllItem = () => {
  return (dispatch) => {
    Helper(true);
    return findAllItem().then(({data}) => {
      dispatch(actFetchItem(data));
      Helper(false);
    }).catch(error => console.log(error));
  }
}

const actFetchItem = (listItem) => {
  return {
    type : FETCH_ITEM,
    listItem,
  }
}