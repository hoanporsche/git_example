import * as Types from '../action/quantity.constant';
import { LOCAL_STORAGE } from '../../share/constant/local-storage.constant';

//Lấy danh sách ra từ localstorage trc
let localState = JSON.parse(localStorage.getItem(LOCAL_STORAGE.ORDER));

let initialState = localState ? localState : {
  quantities: [],
  totalPrice: 0,
};

const quantityReducer = (state = initialState, action) => {
  switch (action.type) {
    /** Case này ta kiểm tra item có trùng k(đã tồn tại trong list), 
    * sau đó add/update và lưu lại vào localstorage
    */
    case Types.ADD_QUANTITES: {
      const listOldQuantity = state.quantities;
      let foundItem = listOldQuantity.find(i => i.item.code === action.quantity.item.code);
      //Nếu k trùng thì thêm mới và tính lại tổng giá
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
        //Còn trùng thì update lại item với số lượng và tính lại tổng giá
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
      const newList = state.quantities.filter(i => i.item.code !== action.quantity.item.code);
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
    case Types.CLEAR_QUANTITES: {
      localStorage.removeItem(LOCAL_STORAGE.ORDER);
      return Object.assign({}, {
        quantities: [],
        totalPrice: 0,
      });
    }
    default: return Object.assign({}, state);
  }
}

export default quantityReducer;