import { FETCH_CATEGORY } from '../action/category.constant';

let initialState = [];

const categoryReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_CATEGORY : {
      state = action.listCategory;
      return [...state];
    }
    default : return [...state];
  }
} 

export default categoryReducer;