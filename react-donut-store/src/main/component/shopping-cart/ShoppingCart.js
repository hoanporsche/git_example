import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ShoppingCart.css';

class ShoppingCart extends Component {

  render() {
    const { quantities } = this.props;
    console.log(quantities);
    return (
      <div >
        <a className="btn btn-outline-success my-2 my-sm-0" href="/dang-nhap">Đăng nhập</a>
        {/* <div className="ds-shopping-cart">
          <div className="ds-my-account">
            <div className="ds-account-box">
              <span className="ds-your-account">Tài Khoản</span>
              <div className="links">
                <ul>
                  <li className="first">Đăng nhập</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="ds-mini-cart">
            <a href="/don-hang" className="ds-mini">
              <span>{quantities.length}</span>
            </a>
          </div>
        </div> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    quantities: state.orderReducer.quantities,
  }
}

const mapDispatchToProps = (dispatchEvent) => {
  return
}
export default connect(mapStateToProps, null)(ShoppingCart);