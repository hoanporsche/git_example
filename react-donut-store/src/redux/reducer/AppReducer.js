import { combineReducers } from 'redux';
import itemReducer from './ItemReducer';

const appReducers = combineReducers({
  itemReducer,
});

export default appReducers;