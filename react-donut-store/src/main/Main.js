import React, { Component } from 'react';
import mainRoutes from './MainRouter';
import { Route, Switch } from 'react-router-dom';
import HeaderMain from './layout-main/header-main/HeaderMain';
import FooterMain from './layout-main/footer-main/FooterMain';

class Main extends Component {

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
      <div className="ds-main">
        <HeaderMain />
        <Switch>
          { this.showRoute(mainRoutes) } 
        </Switch>
        <FooterMain />
      </div>
    );
  }
}

export default Main;