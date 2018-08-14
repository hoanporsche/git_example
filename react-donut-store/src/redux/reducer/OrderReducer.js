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
      let foundItem = listOldQuantity.find(i => i.itemCode === action.quantity.itemCode );
      if (foundItem === undefined) {
        return Object.assign({}, state, {
          quantities: listOldQuantity.concat(action.quantity)
        });
      } else {
        const plusedQuantity = foundItem.quantity + action.quantity.quantity;
        if (plusedQuantity < 300) {
          foundItem.quantity = plusedQuantity;
        } else {
          foundItem.quantity = 300;
        }
        return Object.assign({}, state, {
          quantities: listOldQuantity.filter(i => i.itemCode !== foundItem.itemCode).concat(foundItem)
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