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
        <div className="card-header" style={{backgroundColor: 'white'}}>
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
        <div className="card-body" style={{padding: '1%'}}>
          <div className="container" style={{backgroundColor: '#f2f3f880'}}>
            {/* {this.showQuantites(order.quantities)} */}
          </div>
        </div>
      </div>
    ) : (
        <div id="single-order" className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-12 col-md-9">
                No thing
            </div>
              <div className="col-12 col-md-3">

              </div>
            </div>
          </div>
          <div className="card-body">

          </div>
        </div>
      )
  }
}

export default SingleOrder;