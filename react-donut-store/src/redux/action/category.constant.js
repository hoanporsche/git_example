import { findAllCategory } from '../../main/page/util/api-caller';
import { Helper } from '../../share/common/loader/Loader';

export const FETCH_CATEGORY = 'FETCH_CATEGORY';

export const fetAllCategory = () => {
  return (dispatch) => {
    Helper(true);
    return findAllCategory().then(({data}) => {
      dispatch(actFetchCategory(data));
      Helper(false);
    }).catch(error => console.log(error));
  }
}

export const actFetchCategory = (listCategory) => {
  return {
    type : FETCH_CATEGORY,
    listCategory,
  }
}