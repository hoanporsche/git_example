import { FETCH_STORE } from '../action/store.constant';

let initialState = [];

const storeReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_STORE : {
      state = action.listStore;
      return [...state];
    }
    default : return [...state];
  }
} 

export default storeReducer;