import { combineReducers } from 'redux';
import itemReducer from './ItemReducer';
import categoryReducer from './CategoryReducer';
import storeReducer from './StoreReducer';
import orderReducer from './OrderReducer';
import notificationReducer from './NotificationReducer';

const appReducers = combineReducers({
  itemReducer,
  categoryReducer,
  storeReducer,
  orderReducer,
  notificationReducer,
});

export default appReducers;