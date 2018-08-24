import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

/** Khi gửi props từ cha vào. thì mặc định các prop đó cũng đc gán vào cho Route
 * ví dụ <Route path={this.props.path}
 */
class PrivateRoute extends Component {

  render() {
    const { component: Component, canActive, ...rest } = this.props;
    return (
      <Route {...rest} render={props => {
        return (canActive === true ) ? (
          <Component {...props} />
        ) : (<Redirect to={{pathname: this.props.canActive, state: {from: props.location}}} />)}
      }/>
    )
  }
}

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
  canActive: PropTypes.any.isRequired,
}
export default PrivateRoute;