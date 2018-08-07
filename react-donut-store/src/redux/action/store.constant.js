export const FETCH_STORE = 'FETCH_STORE';

export const actFetchStore = (listStore) => {
  return {
    type : FETCH_STORE,
    listStore,
  }
}