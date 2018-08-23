import React, { Component } from 'react';
import queryString from 'query-string';
import './DetailOrder.css';

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
      <div id="detail-order" className="container text-center">
        <h3><i className="fas fa-book"></i> Theo dõi đơn hàng</h3>
        <div className="row">
          <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
            <input type="text" className="form-control" placeholder="nhap ma don hang hoac sdt cua ban"/>
          </div>
        </div>
      </div>
    );
  }
}

export default DetailOrder;