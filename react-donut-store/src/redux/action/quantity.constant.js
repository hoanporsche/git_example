export const ADD_QUANTITES = "ADD_QUANTITY";
export const REMOVE_QUANTITES = "REMOVE_QUANTITY";
export const CLEAR_QUANTITES = "CLEAR_QUANTITES";

export const actAddQuantity = (quantity) => {
  return {
    type : ADD_QUANTITES,
    quantity,
  }
}

export const actRemoveQuantites = (quantity) => {
  return {
    type : REMOVE_QUANTITES,
    quantity,
  }
}

export const clearQuantites = () => {
  return {
    type : CLEAR_QUANTITES,
  }
}