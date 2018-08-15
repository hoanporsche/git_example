import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HeaderMain.css';

class HeaderMain extends Component {

  render() {
    return (
      <div id="header" className="container">
        <div id="header-search" className="one-third bm-remove">
          <form action="/search" method="get" className="clearfix" noValidate>
            <input type="hidden" name="type" defaultValue="product" />
            <input type="text" name="q" className="inline-block w-small bm-remove" placeholder="Bạn cần tìm gì?" autoComplete="off" defaultValue />
            <button type="submit" className="tablet-mobile bm-remove tip-r-fade" data-tooltip="Tìm kiếm"><i className="fa fa-search" /></button>
          </form>
        </div>
        <div id="header-logo" className="one-third bm-remove">
          <a href="/" target="_self">
          </a>
        </div>
        <div id="header-cart" className="one-third bm-remove last">
          <a href="/cart" target="_self"><i className="fa fa-shopping-cart fa-fw" /> Giỏ hàng (<span id="ajax-header-cart-item-count">{this.props.quantities.length}</span> <span id="ajax-header-cart-item-text">sản phẩm</span> - <span id="ajax-header-cart-total-price">0₫</span>)</a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    quantities: state.orderReducer.quantities,
  }
}

export default connect(mapStateToProps, null)(HeaderMain);