import { combineReducers } from 'redux';
import itemReducer from './ItemReducer';
import categoryReducer from './CategoryReducer';
import storeReducer from './StoreReducer';
import quantityReducer from './QuantityReducer';
import notificationReducer from './NotificationReducer';
import configGlobalReducer from './ConfigGlobalReducer';
import orderReducer from './OrderReducer';

const appReducers = combineReducers({
  itemReducer,
  categoryReducer,
  storeReducer,
  quantityReducer,
  notificationReducer,
  configGlobalReducer,
  orderReducer,
});

export default appReducers;