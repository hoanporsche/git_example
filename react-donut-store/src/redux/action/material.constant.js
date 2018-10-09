import { findAll } from '../../management/page/config/model/material/MaterialApiCaller';
import * as Helper from '../../share/common/helper/Helper';

export const FETCH_MATERIAL = 'FETCH_MATERIAL';

export const fetAllMaterial = () => {
  return (dispatch) => {
    Helper.setLoading(true);
    return findAll().then(({data}) => {
      dispatch(actFetchMaterial(data));
      Helper.setLoading(false);
    }).catch(error => console.log(error));
  }
}

export const actFetchMaterial = (listMaterial) => {
  return {
    type : FETCH_MATERIAL,
    listMaterial,
  }
}