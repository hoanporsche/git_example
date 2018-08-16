import React, { Component } from 'react';
import './SingleQuantity.css';
import SingleItem from '../single-item/SingleItem';
import NumberFormat from 'react-number-format';
import { connect } from 'react-redux';
import { actAddQuantity, actRemoveQuantites } from '../../../redux/action/order.constant';

class SingleQuantity extends Component {

  constructor(props) {
    super(props);
    this.state = {
      quantity: +this.props.quantity.quantity,
      inValid: true,
      message: '',
    }
  }

  componentDidMount() {
    if (0 < +this.state.quantity < 301) {
      this.setState({
        inValid: 'false',
      })
    }
  }

  onChange = (event) => {
    const value = +event.target.value;
    if (value > 0 && value < 301) {
      this.setState({
        inValid: false,
        quantity: value
      });
    } else {
      this.setState({
        inValid: true,
        quantity: value
      });
    }
  }

  onDelete = () => {
    this.setState({
      message: "Xóa khỏi giỏ hàng thành công"
    });
    this.props.removeOneQuantity({
      item: this.props.quantity.item,
    });
  }

  onUpdate = () => {
    if (0 < this.state.quantity < 301) {
      this.setState({
        message: "Thêm vào giỏ hàng thành công"
      });
      this.props.addOneQuantity({
        item: this.props.quantity.item,
        quantity: this.state.quantity,
      });
    } else {
      alert("Vui lòng chọn số lượng");
    }
  }

  render() {
    return (
      <div className="col-6 col-md-5 text-center padding-top1">
        <div id="ds-quantity" className="container">
          <div className="row margin-top0">
            <SingleItem item={this.props.quantity.item} definedClass="col-12" />
            <div className="col-12">
              <p>Số lượng </p>
              <div className="item-quantity">
                <div className="input-quantity-container clearfix">
                  <button type="button" className="input-quantity-minus tip-t-fade" data-tooltip="Giảm"><i className="fa fa-minus fa-fw" /></button>
                  <input type="text" className="w-full bm-remove input-quantity" value={this.state.quantity} onChange={this.onChange} />
                  <button type="button" className="input-quantity-plus tip-t-fade" data-tooltip="Tăng" original-title="true"><i className="fa fa-plus fa-fw" /></button>
                </div>
              </div>
              <input type="number" className="form-control" value={this.state.quantity} onChange={this.onChange} />
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
              <button type="button" disabled={this.state.inValid} onClick={this.onUpdate}>Cập nhật</button>
            </div>
            <div className="col-sm-6">
              <button type="button" onClick={this.onDelete}>Xoá</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addOneQuantity: (quantity) => {
      dispatch(actAddQuantity(quantity));
    },
    removeOneQuantity: (quantity) => {
      dispatch(actRemoveQuantites(quantity));
    }
  }
}

export default connect(null, mapDispatchToProps)(SingleQuantity);