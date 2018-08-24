import { FETCH_LIST_ORDER } from '../action/order.constant';

let initialState = {};

const orderReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_LIST_ORDER : {
      state = action.content;
      return Object.assign({}, state);
    }
    default : return [...state];
  }
} 

export default orderReducer;