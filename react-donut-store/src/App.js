import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import MainComponent from './main/main.component';
import ManagementComponent from './management/management.component';
import NotFoundComponent from './error/not-found.component';
import appRoutes from './App.router';

class App extends Component {

  showRoute = (routes) => {
    let result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <Route key={index} path={route.path} exact={route.exact} component={route.main}/>
        )
      });
    }
    return result;
  }
  render() {
    return (
      <Router>
        <div>
          <Switch>
            { this.showRoute(appRoutes) }
            <Route path="/management" component={ManagementComponent} />
            {/* <Route path="/" exact component={MainComponent} /> */}
            <Route path="" component={NotFoundComponent} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
