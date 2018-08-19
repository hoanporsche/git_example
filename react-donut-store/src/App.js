import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './main/Main';
import Management from './management/Management';
import Checkout from './checkout/Checkout';
import Login from './auth/page/login/Login';
import NotificationContainer from './share/common/notification-container/NotificationContainer';
import { authGuard } from './auth/guard';
import PrivateRoute from './auth/PrivateRoute';
import { ROUTING_URL, MODEL_ROUTING } from './share/constant/routing.constant';
import Unauthorized from './error/Unauthorized';

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path={ROUTING_URL.LOGIN} component={Login} />
            <Route path={ROUTING_URL.CHECKOUT} component={Checkout} />
            <Route path={ROUTING_URL.UNAUTHORIZED} component={Unauthorized} />
            <PrivateRoute path={MODEL_ROUTING.MANAGEMENT} component={Management} canActive={authGuard()}/>
            <Route path={ROUTING_URL.HOME} component={Main} />
          </Switch>
          <NotificationContainer props />
        </div>
      </Router>
    );
  }
}

export default App;
