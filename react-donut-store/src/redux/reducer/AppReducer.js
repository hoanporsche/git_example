import { combineReducers } from 'redux';
import itemReducer from './ItemReducer';
import categoryReducer from './CategoryReducer';
import storeReducer from './StoreReducer';
import quantityReducer from './QuantityReducer';
import notificationReducer from './NotificationReducer';
import configGlobalReducer from './ConfigGlobalReducer';
import orderReducer from './OrderReducer';
import materialReducer from './MaterialReducer';

const appReducers = combineReducers({
  itemReducer,
  categoryReducer,
  storeReducer,
  quantityReducer,
  notificationReducer,
  configGlobalReducer,
  orderReducer,
  materialReducer,
});

export default appReducers;