import React, { Component } from 'react';
import './Order.css';
import SectionHeader from '../../component/section-header/SectionHeader';
import { connect } from 'react-redux';
import { fetAllStore } from '../../../redux/action/store.constant';
import EmptyCart from '../../component/empty-cart/EmptyCart';
import NumberFormat from 'react-number-format';
import { NavLink } from 'react-router-dom';
import SingleQuantity from '../../component/single-quantity/SingleQuantity';

class Order extends Component {

  constructor(props) {
    super(props);
    this.state = {
      quantites: [],
      totalPrice: 0,
    }
  }

  showShippingCart = () => {
    return (this.props.order.quantities.length > 0) ? (
      <div className="row">
        <div className="col-md-8 padding-top1">
          <div className="row">
            {this.showQuantities(this.props.order.quantities)}
          </div>
        </div>
        <div className="col-md-4 padding-top1">
          <div id="box-order">
            <h3>Thanh toán</h3>
            <hr />
            <div className="text-center">
              <h1>Tạm tính: <NumberFormat value={this.props.order.totalPrice} displayType={'text'} thousandSeparator={true} />₫</h1>
              <NavLink className="payment-click" to={"/payment"} >Tiến hành thanh toán</NavLink>
            </div>
          </div>
        </div>
      </div>
    ) : <EmptyCart />
  }

  showQuantities = (quantities) => {
    return quantities.map((quantity, index) => {
      return (
        <SingleQuantity key={index} quantity={quantity} />
      )
    });
  }

  render() {
    return (
      <div className="container">
        <SectionHeader title="Giỏ hàng của bạn" />
        <p className="text-center">Giỏ hàng ({this.props.order.quantities.length} Sản phẩm - <NumberFormat value={this.props.order.totalPrice} displayType={'text'} thousandSeparator={true} />₫)</p>
        {this.showShippingCart()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    order: state.orderReducer,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAllStore: () => {
      dispatch(fetAllStore());
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Order);