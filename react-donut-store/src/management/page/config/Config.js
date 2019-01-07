import React, { Component } from 'react';
import configRoutes from './ConfigRouter';
import { Switch } from 'react-router-dom';
import PrivateRoute from '../../../auth/PrivateRoute';
import AsideNavManagement from '../../layout-management/aside-nav-management/AsideNavManagement';
import './Config.css';

class Config extends Component {

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
        <div id="div-aside-nav-mana" className="aside-nav padding-top1">
          <AsideNavManagement />
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

export default Config;