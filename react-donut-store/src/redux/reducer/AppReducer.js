import { combineReducers } from 'redux';
import itemReducer from './ItemReducer';
import categoryReducer from './CategoryReducer';
import storeReducer from './StoreReducer';
import quantityReducer from './QuantityReducer';
import notificationReducer from './NotificationReducer';
import configGlobalReducer from './ConfigGlobalReducer';

const appReducers = combineReducers({
  itemReducer,
  categoryReducer,
  storeReducer,
  quantityReducer,
  notificationReducer,
  configGlobalReducer,
});

export default appReducers;