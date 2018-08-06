import React, { Component } from 'react';
import mainRoutes from './main.routing';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HeaderMainComponent from './layout-main/header-main/header-main.component';
import FooterMainComponent from './layout-main/footer-main/footer-main';

class MainComponent extends Component {

  constructor(props) {
    super(props);
  }

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
        <HeaderMainComponent />
        {this.showRoute(mainRoutes)}
        <FooterMainComponent />
      </div>
    );
  }
}

export default MainComponent;