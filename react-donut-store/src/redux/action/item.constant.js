import { findAllItem } from '../../main/page/util/api-caller';

export const FETCH_ITEM = 'FETCH_ITEM';

export const fetAllItem = () => {
  return (dispatch) => {
    return findAllItem().then(({data}) => {
      dispatch(actFetchItem(data));
    }).catch(error => console.log(error));
  }
}

const actFetchItem = (listItem) => {
  return {
    type : FETCH_ITEM,
    listItem,
  }
}