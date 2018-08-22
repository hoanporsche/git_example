import { findAllCategory } from '../../main/page/util/api-caller';
import * as Helper from '../../share/common/helper/Helper';

export const FETCH_CATEGORY = 'FETCH_CATEGORY';

export const fetAllCategory = () => {
  return (dispatch) => {
    Helper.setLoading(true);
    return findAllCategory().then(({data}) => {
      dispatch(actFetchCategory(data));
      Helper.setLoading(false);
    }).catch(error => console.log(error));
  }
}

export const actFetchCategory = (listCategory) => {
  return {
    type : FETCH_CATEGORY,
    listCategory,
  }
}