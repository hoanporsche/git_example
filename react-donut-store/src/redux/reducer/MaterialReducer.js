import { FETCH_MATERIAL } from '../action/material.constant';

let initialState = [];

const materialReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_MATERIAL : {
      state = action.listMaterial;
      return [...state];
    }
    default : return [...state];
  }
} 

export default materialReducer;