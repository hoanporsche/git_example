import { findAllStore } from '../../main/page/util/api-caller';
import { Helper } from '../../share/common/loader/Loader';

export const FETCH_STORE = 'FETCH_STORE';

export const fetAllStore = () => {
  return (dispatch) => {
    Helper(true);
    findAllStore().then(({data}) => {
      dispatch(actFetchStore(data));
      Helper(true);
    }).catch(error => console.log(error));
  }
}
export const actFetchStore = (listStore) => {
  return {
    type : FETCH_STORE,
    listStore,
  }
}