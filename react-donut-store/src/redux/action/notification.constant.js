export const ADD_NOTIFICATION = "ADD_NOTIFICATION";

export function addNotification(message, level) {
  return {
    type: ADD_NOTIFICATION,
    message,
    level
  };
}