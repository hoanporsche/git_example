import React, { Component } from 'react';
import configRoutes from './ReportRouter';
import { Switch } from 'react-router-dom';
import PrivateRoute from '../../../auth/PrivateRoute';
import ReportAsideNav from '../../layout-management/aside-nav-management/ReportAsideNav';

class Report extends Component {

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
      <div className="row page-min-height">
        <div id="div-aside-nav-report" className="aside-nav padding-top1">
          <ReportAsideNav />
        </div>
        <div id="config-content" className="config-content col-12">
          <Switch>
            {this.showRoute(configRoutes)}
          </Switch>
        </div>
      </div>
    )
  }
}

export default Report;