import { findAllStore } from '../../main/page/util/api-caller';

export const FETCH_STORE = 'FETCH_STORE';

export const fetAllStore = () => {
  return (dispatch) => {
    findAllStore().then(({data}) => {
      dispatch(actFetchStore(data));
    }).catch(error => console.log(error));
  }
}
export const actFetchStore = (listStore) => {
  return {
    type : FETCH_STORE,
    listStore,
  }
}