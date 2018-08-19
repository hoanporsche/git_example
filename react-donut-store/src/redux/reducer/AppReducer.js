import { combineReducers } from 'redux';
import itemReducer from './ItemReducer';
import categoryReducer from './CategoryReducer';
import storeReducer from './StoreReducer';
import quantityReducer from './QuantityReducer';
import notificationReducer from './NotificationReducer';

const appReducers = combineReducers({
  itemReducer,
  categoryReducer,
  storeReducer,
  quantityReducer,
  notificationReducer,
});

export default appReducers;