import { ADD_NOTIFICATION } from '../action/notification.constant';

let initialState = {};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION: {
      return Object.assign({}, state, {
        level: action.level,
        autoDismiss: action.autoDismiss,
        children: action.children
      });
    }
    default: {
      console.debug('notification reducer :: hit default', action.type);
      return Object.assign({}, state);
    }
  }
}

export default notificationReducer;