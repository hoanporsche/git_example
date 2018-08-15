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
          <div className="col-sm-4">
            <input type="text" name="q" className="inline-block w-small bm-remove" placeholder="Bạn cần tìm gì?" onKeyPress={this.onKeyPress} />
          </div>
          <div className="col-sm-4">
            <NavLink to={"/"} className="image"></NavLink>
          </div>
          <div className="col-sm-4">
          <a href="/cart" target="_self"><i className="fa fa-shopping-cart fa-fw" /> Giỏ hàng (<span id="ajax-header-cart-item-count">{this.props.quantities.length}</span> <span id="ajax-header-cart-item-text">sản phẩm</span> - <span id="ajax-header-cart-total-price">0₫</span>)</a>
          </div>
          {/* <div id="header-search" className="one-third bm-remove">
            <div className="clearfix">
              
            </div>
          </div> */}
          {/* <div id="header-logo" className="one-third bm-remove">
            
          </div>
          <div id="header-cart" className="one-third bm-remove last">
            <a href="/cart" target="_self"><i className="fa fa-shopping-cart fa-fw" /> Giỏ hàng (<span id="ajax-header-cart-item-count">{this.props.quantities.length}</span> <span id="ajax-header-cart-item-text">sản phẩm</span> - <span id="ajax-header-cart-total-price">0₫</span>)</a>
          </div> */}

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