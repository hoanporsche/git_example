import { FETCH_CONFIG_GLOBAL } from '../action/config-global.constant';
import { LOCAL_STORAGE } from '../../share/constant/local-storage.constant';

let initialState = [];

const configGlobalReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_CONFIG_GLOBAL : {
      state = action.listConfigGlobal;
      localStorage.setItem(LOCAL_STORAGE.CONFIG_GLOBAL, JSON.stringify(state));
      return [...state];
    }
    default : return [...state];
  }
} 

export default configGlobalReducer;