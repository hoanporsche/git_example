import { combineReducers } from 'redux';
import itemReducer from './ItemReducer';
import categoryReducer from './CategoryReducer';
import storeReducer from './StoreReducer';
import orderReducer from './OrderReducer';

const appReducers = combineReducers({
  itemReducer,
  categoryReducer,
  storeReducer,
  orderReducer,
});

export default appReducers;