import React, { Component } from 'react';
import mainRoutes from './MainRouter';
import { Route, Switch } from 'react-router-dom';
import HeaderMain from './layout-main/header-main/HeaderMain';
import MenuMain from './layout-main/menu-main/MenuMain';
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
      <div className="page-border">
        <HeaderMain />
        <MenuMain />
        <Switch>
          {this.showRoute(mainRoutes)}
        </Switch>
        <div className="fb-messengermessageus fb-messengermessageus-custom" messengerappid={2150713538567990} pageid="478740035631679" color="blue" size="xlarge">
        </div>
        <FooterMain />
      </div>
    );
  }
}

export default Main;