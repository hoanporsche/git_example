import React, { Component } from 'react';
import './SingleOrderManagement.css';
import NumberFormat from 'react-number-format';

class SingleOrderManagement extends Component {

  showQuantites = (quantities) => {
    return (quantities.length > 0) ? (
      quantities.map((quantity, index) => {
        return (
          <div key={index} className="row single-row">
            <div className="col-3">
              <div className="quantity-item" style={{ backgroundImage: `url(${quantity.itemId.picture.split(',')[0]})` }}>
                <span className="product-thumbnail-quantity" aria-hidden="true">{quantity.quantity}</span>
              </div>
            </div>
            <div className="col-6">
              <h5>{quantity.itemId.name}</h5>
              {/* <p>{quantity.itemId.description}</p> */}
            </div>
            <div className="col-3"><span className="float-right"><NumberFormat value={quantity.quantity * quantity.itemId.singleValue} displayType={'text'} thousandSeparator={true} />₫</span></div>
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
                <span className={`status ${order.statusId.name}`}>{order.statusId.description}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body detail-body">
          <div className="container-fluid detail-container">
            <div className="row">
              <div className="col-12 col-md-6">
                {this.showQuantites(order.quantities)}
              </div>
              <div className="col-12 col-md-6">
                <div className="row">
                  <div className="col-6"><span>Địa chỉ:</span></div>
                  <div className="col-6"><span className="float-right">{order.addressShipping}</span></div>
                </div>
                <div className="row">
                  <div className="col-6"><span>Phone:</span></div>
                  <div className="col-6"><span className="float-right">{order.phone}</span></div>
                </div>
                {order.shipping ? (
                  <div className="row">
                    <div className="col-6"><span>Phí ship:</span></div>
                    <div className="col-6"><span className="float-right"><NumberFormat value={order.shippingPrice} displayType={'text'} thousandSeparator={true} />₫</span></div>
                  </div>
                ) : (
                    <div className="row">
                      <span>Dùng luôn:</span>
                    </div>
                  )}
                <div className="row">
                  <div className="col-6"><span>Ngày tạo:</span></div>
                  <div className="col-6"><span className="float-right">{(new Date(order.dateCreated)).toLocaleString()}</span></div>
                </div>
                <hr />
                <div className="row" style={{ color: 'black' }}>
                  <div className="col-6"><h5>Cập nhật cuối:</h5></div>
                  <div className="col-6"><h5 className="float-right">{(new Date(order.dateUpdated)).toLocaleString()}</h5></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
        <div id="single-order" className="card">
          <div className="card-header detail-header">
            <div className="row">
              <div className="col-12 col-md-9">
                <span className="title-text">{this.props.message}</span>
              </div>
              <div className="col-12 col-md-3">

              </div>
            </div>
          </div>
          <div className="card-body detail-body">
            <div className="container-fluid detail-container">
              -
              {/* <span className={`status verifying`}>verifying</span>
              <span className={`status accepted`}>accepted</span>
              <span className={`status in-progress`}>in-progress</span>
              <span className={`status completed`}>completed</span>
              <span className={`status cancel`}>cancelled</span> */}
            </div>
          </div>
        </div>
      )
  }
}

export default SingleOrderManagement;