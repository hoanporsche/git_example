import React, { Component } from 'react';
import managementRoutes from './ManagementRouter';
import { Switch } from 'react-router-dom';
import PrivateRoute from '../auth/PrivateRoute';
import HeaderManagement from './layout-management/header-management/HeaderManagement';
import FooterManagement from './layout-management/footer-management/FooterManagement';

class Management extends Component {
  
  showRoute = (routes) => {
    let result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <PrivateRoute key={index} path={route.path} canActive={route.canActive} exact={route.exact} component={route.main} />
        );
      });
    }
    return result;
  }

  render() {
    return (
      <div style={{backgroundColor: 'beige'}}>
        <HeaderManagement />
        <Switch>
          {this.showRoute(managementRoutes)}
        </Switch>
        <FooterManagement />
      </div>
    );
  }
}

export default Management;