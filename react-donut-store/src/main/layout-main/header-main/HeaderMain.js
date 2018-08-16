import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './HeaderMain.css';
import NumberFormat from 'react-number-format';
import SearchRedirect from '../../../share/common/search-redirect/SearchRedirect';

class HeaderMain extends Component {

  render() {
    return (
      <header className="container">
        <div id="header" className="row">
          {/* <div className="col-md-5 header-search">
            <input type="text" name="q" className="inline-block w-small bm-remove" placeholder="Bạn cần tìm gì?" onKeyPress={this.onKeyPress} maxLength="255" autoComplete="off" defaultValue="" />
          </div> */}
          <SearchRedirect />
          <div className="col-md-2 header-logo">
            <NavLink to={"/"} className="image-logo">
              <img src={"https://res.cloudinary.com/hitkeodog/image/upload/v1533569776/donut-store/banh-ran/BR6.jpg"} className="image" alt="brand" />
            </NavLink>
          </div>
          <div className="col-md-5 header-cart">
            <NavLink to={"/gio-hang"} className="text-cart">
              <i className="fa fa-shopping-cart fa-fw" /> Giỏ hàng (<span>{this.props.order.quantities.length}</span> <span>sản phẩm</span> - <span><NumberFormat value={this.props.order.totalPrice} displayType={'text'} thousandSeparator={true}/>₫</span>)
            </NavLink>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => {
  return {
    order: state.orderReducer,
  }
}

export default connect(mapStateToProps, null)(HeaderMain);