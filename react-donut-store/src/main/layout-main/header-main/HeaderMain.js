import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './HeaderMain.css';

class HeaderMain extends Component {

  onKeyPress = (event) => {
    if (event.key === 'Enter') {
      console.log(event.target.value);
    }
  }

  render() {
    return (
      <header className="container">
        <div id="header" className="row">
          <div className="col-md-4 header-search">
            <input type="text" name="q" className="inline-block w-small bm-remove" placeholder="Bạn cần tìm gì?" onKeyPress={this.onKeyPress} maxLength="255" autoComplete="off" defaultValue=""/>
          </div>
          <div className="col-md-4 header-logo">
            <NavLink to={"/"} className="image-logo">
            <img src={"https://res.cloudinary.com/hitkeodog/image/upload/v1533569776/donut-store/banh-ran/BR6.jpg"} className="image" alt="brand" />
            </NavLink>
          </div>
          <div className="col-md-4 header-cart">
            <NavLink to={"/gio-hang"} className="text-cart"><i className="fa fa-shopping-cart fa-fw" /> Giỏ hàng (<span>{this.props.quantities.length}</span> <span>sản phẩm</span> - <span id="ajax-header-cart-total-price">0₫</span>)</NavLink>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => {
  return {
    quantities: state.orderReducer.quantities,
  }
}

export default connect(mapStateToProps, null)(HeaderMain);