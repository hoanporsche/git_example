import React, { Component  } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addNotification } from '../../../redux/action/notification.constant';
import NotificationSystem from 'react-notification-system';

class NotificationContainer extends Component {

  notificationSystem = null;
 
  componentDidMount() {
    this.notificationSystem = this.refs.notificationSystem;
  }
 
  componentWillReceiveProps(newProps) {
    const { message, level } = newProps.notification;
    this.notificationSystem.addNotification({
      message,
      level
    });
  }
 
  render() {
    return (
      <NotificationSystem ref="notificationSystem" />
    );
  }
}

const mapStateToProps = state => {
  return { 
    notification: state.notificationReducer,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    addNoti: bindActionCreators({
      addNotification
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationContainer);