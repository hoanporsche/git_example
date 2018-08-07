import { combineReducers } from 'redux';
import itemReducer from './ItemReducer';
import categoryReducer from './CategoryReducer';
import storeReducer from './StoreReducer';

const appReducers = combineReducers({
  itemReducer,
  categoryReducer,
  storeReducer,
});

export default appReducers;