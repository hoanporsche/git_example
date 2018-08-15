import * as Types from '../action/order.constant';
import { LOCAL_STORAGE } from '../../share/constant/local-storage.constant';

let localState = JSON.parse(localStorage.getItem(LOCAL_STORAGE.ORDER));

let initialState = (localState !== null) ?  localState : {
  quantities: [],
  totalPrice: 0,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.ADD_QUANTITES: {
      const listOldQuantity = state.quantities;
      let foundItem = listOldQuantity.find(i => i.item.code === action.quantity.item.code);
      if (foundItem === undefined) {
        const newQuantity = {
          item: action.quantity.item,
          quantity: action.quantity.quantity,
          price: action.quantity.quantity * action.quantity.item.singleValue,
        }
        const newList = listOldQuantity.concat(newQuantity);
        let totalPrice = 0;
        for (let i = 0; i < newList.length; i++) {
          totalPrice = totalPrice + newList[i].price;
        }
        const newState = Object.assign({}, state, {
          quantities: newList,
          totalPrice
        });
        localStorage.setItem(LOCAL_STORAGE.ORDER, JSON.stringify(newState));
        return newState;
      } else {
        foundItem.quantity = action.quantity.quantity;
        foundItem.price = action.quantity.quantity * foundItem.item.singleValue;
        const newList = listOldQuantity.filter(i => i.item.code !== foundItem.item.code).concat(foundItem); 
        let totalPrice = 0;
        for (let i = 0; i < newList.length; i++) {
          totalPrice = totalPrice + newList[i].price;
        }
        const newState = Object.assign({}, state, {
          quantities: newList,
          totalPrice
        });
        localStorage.setItem(LOCAL_STORAGE.ORDER, JSON.stringify(newState));
        return newState;
      }
    }
    case Types.REMOVE_QUANTITES: {
      return Object.assign({}, state, {
        quantities: state.quantities.filter(i => i !== action.quantity),
      });
    }
    default: return Object.assign({}, state);
  }
}

export default orderReducer;