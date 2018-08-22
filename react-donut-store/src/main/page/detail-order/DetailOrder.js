import React, { Component } from 'react';
import queryString from 'query-string';

class DetailOrder extends Component {

  constructor(props) {
    super(props);
    this.state = {
      orderCode: '',
    }
  }
  componentWillReceiveProps({ location }) {
    const queryParam = queryString.parse(location.search);
    console.log(queryParam);
    this.setState({
      orderCode: queryParam.orderCode,
    })
  }

  render() {
    return (
      <div>
        Detail Order
      </div>
    );
  }
}

export default DetailOrder;