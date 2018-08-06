import React, { Component } from 'react';
import routes from './management.routing';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HeaderManagementComponent from './layout-management/header-management/header-management.component';
import FooterManagementComponent from './layout-management/footer-management/footer-management.component';

class ManagementComponent extends Component {

  showRoute = (routes) => {
    let result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <Route key={index} path={route.path} exact={route.exact} component={route.main} />
        );
      });
    }
    return result;
  }

  render() {
    return (
        <div>
          <HeaderManagementComponent />
            {this.showRoute(routes)}
          <FooterManagementComponent />
        </div>
    );
  }
}

export default ManagementComponent;