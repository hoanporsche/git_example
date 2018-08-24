export const ADD_NOTIFICATION = "ADD_NOTIFICATION";

export function addNotification(level, autoDismiss, children) {
  return {
    type: ADD_NOTIFICATION,
    level,
    autoDismiss,
    children
  };
}