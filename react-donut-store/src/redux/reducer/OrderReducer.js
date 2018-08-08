import * as Types from '../action/order.constant';
import { Object } from 'core-js';

let initialState = {
  nameCreated : '',
  phone : '',
  storeId : '',
  statusId : '',
  quantities : [],
  isShipping : false,
  addressShipping : '',
  distance : 0,
  shippingPrice : 0,
  totalPrice : 0,
}

const orderReducer = (state = initialState, action) => {
  switch(action.type) {
    case Types.ADD_QUANTITES: {
      return Object.assign({}, state, {
        quantities: state.quantities.concat(action.quantity)
      });
    }case Types.REMOVE_QUANTITES: {
      const newList = state.quantities.filter(i => i !== action.quantity);
      return Object.assign({}, state, {
        quantities: newList,
      });
    }
    default : return Object.assign({}, state);
  }
}

export default orderReducer;