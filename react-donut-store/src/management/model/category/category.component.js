import React, { Component } from 'react';
import routes from './category.routing';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class CategoryComponent extends Component {
  // constructor(props) {
  //   super(props);
  // }

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
      <Router>
        <div>
          <Switch>
            {this.showRoute(routes)}
          </Switch>

        </div>
      </Router>
    );
  }
}

export default CategoryComponent;