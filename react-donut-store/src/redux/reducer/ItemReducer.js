import { FETCH_ITEM } from '../action/item.constant';

let initialState = [];

const itemReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_ITEM : {
      state = action.listItem;
      return [...state];
    }
    default : return [...state];
  }
} 

export default itemReducer;