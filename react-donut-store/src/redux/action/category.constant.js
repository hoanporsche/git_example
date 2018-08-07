export const FETCH_CATEGORY = 'FETCH_CATEGORY';

export const actFetchCategory = (listCategory) => {
  return {
    type : FETCH_CATEGORY,
    listCategory,
  }
}