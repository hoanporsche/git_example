import React, { Component } from 'react';
import './SingleOrder.css';
import NumberFormat from 'react-number-format';

class SingleOrder extends Component {

  showQuantites = (quantities) => {
    return (quantities.length > 0) ? (
      quantities.map((quantity, index) => {
        return (
          <div key={index} className="row single-row">
            <div className="col-3">
              <div className="quantity-item" style={{ backgroundImage: `url(${quantity.item.picture[0]})` }}>
                <span className="product-thumbnail-quantity" aria-hidden="true">{quantity.quantity}</span>
              </div>
            </div>
            <div className="col-6">
              <h5>{quantity.item.name}</h5>
              <p>{quantity.item.description}</p>
            </div>
            <div className="col-3"><span className="float-right"><NumberFormat value={quantity.price} displayType={'text'} thousandSeparator={true} />₫</span></div>
          </div>
        )
      })
    ) : null;
  }
  render() {
    const { order } = this.props;
    return order ? (
      <div id="single-order" className="card">
        <div className="card-header detail-header">
          <div className="row">
            <div className="col-12 col-md-9">
              <span className="normal-text">Đơn hàng </span>
              <span className="title-text">{order.code}</span>
              <span className="normal-text"> từ</span>
              <span className="title-text"> {order.nameCreated}</span>
              <span className="normal-text"> với giá trị </span>
              <span className="title-text"><NumberFormat value={order.totalPrice} displayType={'text'} thousandSeparator={true} />₫</span>
            </div>
            <div className="col-12 col-md-3">
              <div className="float-right">
                <span className={`status ${order.status.name}`}>{order.status.description}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body detail-body">
          <div className="container detail-container">
            <div className="row">
              <div className="col-12 col-md-8">
                {this.showQuantites(order.quantities)}
              </div>
              <div className="col-12 col-md-4">
                <div className="row">
                  <div className="col-6"><span>Địa chỉ:</span></div>
                  <div className="col-6"><span className="float-right">{order.addressShipping}</span></div>
                </div>
                <div className="row">
                  <div className="col-6"><span>Phone:</span></div>
                  <div className="col-6"><span className="float-right">{order.phone}</span></div>
                </div>
                <div className="row">
                  <div className="col-6"><span>Phí ship:</span></div>
                  <div className="col-6"><span className="float-right"><NumberFormat value={order.shippingPrice} displayType={'text'} thousandSeparator={true} />₫</span></div>
                </div>
                <hr />
                <div className="row" style={{ color: 'black' }}>
                  <div className="col-12"><h5>Đơn hàng sẽ được giao ngay sau khi xác thực thành công</h5></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div id="single-order">
        <span className="title-text">{this.props.message}</span>
      </div>
      )
  }
}

export default SingleOrder;