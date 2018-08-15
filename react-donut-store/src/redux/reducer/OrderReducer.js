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
        const newQuantity = {
          item: action.quantity.item,
          quantity: action.quantity.quantity,
          price: action.quantity.quantity * action.quantity.item.singleValue,
        }
        return Object.assign({}, state, {
          quantities: listOldQuantity.concat(newQuantity)
        });
      } else {
        foundItem.quantity = action.quantity.quantity;
        foundItem.price = action.quantity.quantity * foundItem.item.singleValue;
        return Object.assign({}, state, {
          quantities: listOldQuantity.filter(i => i.item.code !== foundItem.item.code).concat(foundItem)
        });
      }
    }
    case Types.REMOVE_QUANTITES: {
      return Object.assign({}, state, {
        quantities: state.quantities.filter(i => i !== action.quantity),
      });
    }
    default : return Object.assign({}, state);
  }
}

export default orderReducer;