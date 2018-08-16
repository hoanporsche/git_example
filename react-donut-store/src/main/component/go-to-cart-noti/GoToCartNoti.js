import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './GoToCartNoti.css';

class GoToCartNoti extends Component {

  render() {
    return (
      <div id="go-to-cart-noti" className="container-fluid">
        <div className="row">
          <div className="col-4">
            <div className="item-go-to-image" style={{ backgroundImage: `url(${this.props.picture})` }}></div>
          </div>
          <div className="col-8">
            <h5>{this.props.title}</h5>
            <p>{this.props.message}</p>
          </div>
          <div className="col-12 text-center">
            <NavLink className="nav-to-cart" to={'/gio-hang'} ><span>Kiểm tra giỏ hàng</span></NavLink>
          </div>
        </div>
      </div>
    )
  }
}

export default GoToCartNoti;