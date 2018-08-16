import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './main/Main';
import ManagementComponent from './management/management.component';
import NotFound from './error/NotFound';
import NotificationContainer from './share/common/notification-container/NotificationContainer';

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/" component={Main} />
            <Route path="/management" component={ManagementComponent} />
            <Route path="" component={NotFound} />
          </Switch>
          <NotificationContainer props />
        </div>
      </Router>
    );
  }
}

export default App;
