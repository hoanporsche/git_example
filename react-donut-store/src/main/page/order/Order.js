import React, { Component } from 'react';
import HeaderMain from '../../layout-main/header-main/HeaderMain';
import FooterMain from '../../layout-main/footer-main/FooterMain';

class OrderComponent extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <HeaderMain />
        Order
        <FooterMain />
      </div>
    );
  }
}

export default OrderComponent;