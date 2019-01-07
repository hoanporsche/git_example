import { findAllStore } from '../../main/util/api-caller';
import * as Helper from '../../share/common/helper/Helper';

export const FETCH_STORE = 'FETCH_STORE';

export const fetAllStore = () => {
  return (dispatch) => {
    Helper.setLoading(true);
    findAllStore().then(({data}) => {
      dispatch(actFetchStore(data));
      Helper.setLoading(false);
    }).catch(error => Helper.setLoading(false));
  }
}
export const actFetchStore = (listStore) => {
  return {
    type : FETCH_STORE,
    listStore,
  }
}