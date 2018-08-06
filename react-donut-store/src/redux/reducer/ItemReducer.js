import { FETCH_ITEM } from '../action/item.constant';

let initialState = [];

const itemReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_ITEM : {
      return action.body;
    }
    default : return [...state];
  }
} 

export default itemReducer;