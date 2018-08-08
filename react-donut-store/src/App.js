import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './main/Main';
import ManagementComponent from './management/management.component';
import NotFound from './error/NotFound';

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/management" component={ManagementComponent} />
            <Route path="/" component={Main} />
            <Route path="" component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
