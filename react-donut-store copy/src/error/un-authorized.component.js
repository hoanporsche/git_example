import React, { Component } from 'react';

class UnAuthorizedComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <h1>UnAuthorized</h1>
      </div>
    );
  }
}

export default UnAuthorizedComponent;