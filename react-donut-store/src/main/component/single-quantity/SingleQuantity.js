import React, { Component } from 'react';
import './SingleQuantity.css';
import SingleItem from '../single-item/SingleItem';
import NumberFormat from 'react-number-format';

class SingleQuantity extends Component {

  render() {
    return (
      <div className="col-6 col-md-5 text-center padding-top1">
        <div id="ds-quantity" className="container">
          <div className="row margin-top0">
            <SingleItem item={this.props.quantity.item} definedClass="col-12" />
            <div className="col-12">
              <p>Số lượng </p>
              <input type="number" className="form-control" value={this.props.quantity.quantity} />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <p>Giá</p>
              <p><NumberFormat value={this.props.quantity.item.singleValue} displayType={'text'} thousandSeparator={true} />₫</p>
            </div>
            <div className="col-6">
              <p>Tổng</p>
              <p><NumberFormat value={this.props.quantity.price} displayType={'text'} thousandSeparator={true} />₫</p>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
            <button>Cập nhật</button>
            </div>
            <div className="col-sm-6">
            <button>Xoá</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleQuantity;