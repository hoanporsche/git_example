export const ADD_QUANTITES = "ADD_QUANTITES";
export const REMOVE_QUANTITES = "REMOVE_QUANTITES";

export const actAddQuantites = (quantity) => {
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