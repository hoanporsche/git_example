import { combineReducers } from 'redux';
import itemReducer from './ItemReducer';
import categoryReducer from './CategoryReducer';

const appReducers = combineReducers({
  itemReducer,
  categoryReducer,
});

export default appReducers;