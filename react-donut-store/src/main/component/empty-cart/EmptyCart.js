import React, { Component } from 'react';
import './EmptyCart.css';

class EmptyCart extends Component {

  render() {
    return (
      <div className="empty-cart-segment">
        <div className="content-field">
          Chưa có sản phẩm <br />trong giỏ hàng của bạn
        </div>
      </div>
    )
  }
}

export default EmptyCart;