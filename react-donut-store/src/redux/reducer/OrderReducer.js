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
      const listOldQuantity = state.quantities;
      let foundItem = listOldQuantity.find(i => i.item.code === action.quantity.item.code );
      if (foundItem === undefined) {
        return Object.assign({}, state, {
          quantities: listOldQuantity.concat(action.quantity)
        });
      } else {
        foundItem.quantity = action.quantity.quantity;
        return Object.assign({}, state, {
          quantities: listOldQuantity.filter(i => i.item.code !== foundItem.item.code).concat(foundItem)
        });
      }
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