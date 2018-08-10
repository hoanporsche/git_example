import { findAllCategory } from '../../main/page/util/api-caller';

export const FETCH_CATEGORY = 'FETCH_CATEGORY';

export const fetAllCategory = () => {
  return (dispatch) => {
    return findAllCategory().then(({data}) => {
      dispatch(actFetchCategory(data));
    }).catch(error => console.log(error));
  }
}

export const actFetchCategory = (listCategory) => {
  return {
    type : FETCH_CATEGORY,
    listCategory,
  }
}