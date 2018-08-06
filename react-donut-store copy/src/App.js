import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainComponent from './main/main.component';
import ManagementComponent from './management/management.component';
import NotFoundComponent from './error/not-found.component';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/management" component={ManagementComponent} />
            <Route path="/" exact component={MainComponent} />
            <Route path="" component={NotFoundComponent} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
