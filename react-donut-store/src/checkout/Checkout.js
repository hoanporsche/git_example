import React, { Component } from 'react';
import './Checkout.css';
import { connect } from 'react-redux';
import { ROUTING_URL, MENU_NAME } from '../share/constant/routing.constant';
import Breadcrumb from '../main/component/bread-crumb/Breadcrumb';
import CustomInput from '../share/common/custom-input/CustomInput';

const listBreadcrumb = [
  {
    label: MENU_NAME.HOME,
    to: ROUTING_URL.HOME,
    activeOnlyWhenExact: true,
  },
  {
    label: MENU_NAME.ORDER,
    to: ROUTING_URL.ORDER,
    activeOnlyWhenExact: false
  },
  {
    label: MENU_NAME.CHECKOUT,
    to: ROUTING_URL.CHECKOUT,
    activeOnlyWhenExact: false,
  },
]
class Checkout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dateUpdated: '',
      nameCreated: '',
      phone: '',
      storeId: '',
      addressShipping: '',
      distance: '',
      shippingPrice: '',
      totalPrice: '',
    }
  }

  onReceivedValue = (event) => {
    // console.log(event);
    this.setState({
      [event.name]: event.value
    })
  }
  render() {
    return (
      <div id="check-out" className="container-fluid">

        <div className="row">
          <div className="container buyer-info">
            <div className="buyer-header">
              <h4>Bánh rán Hoàn</h4>
              <Breadcrumb listBreadcrumb={listBreadcrumb} />
            </div>
            <div className="row buyer-step">
              <div className="col-12 col-md-11">
                <p>Thông tin giao hàng</p>
              </div>
              <div className="col-12 col-md-11">
                <CustomInput type='text' required={true}
                  placeholder="Tên của bạn" name="nameCreated" value={this.state.nameCreated}
                  maxLength={20} onEmittedValue={this.onReceivedValue} />
              </div>
              <div className="col-12 col-md-11">
                <div className="row">
                  <div className="col-12 col-md-7">
                    <CustomInput type='datetime-local' required={true}
                      placeholder="Thời gian giao hàng" name="dateUpdated" value={this.state.dateUpdated}
                      maxLength={12} onEmittedValue={this.onReceivedValue} />
                  </div>
                  <div className="col-12 col-md-5">
                    <CustomInput type='text' required={true}
                      placeholder="Số điện thoại" name="phone" value={this.state.phone}
                      maxLength={12} onEmittedValue={this.onReceivedValue} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container slide-item">
            123
          </div>

        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    order: state.orderReducer,
  }
}
export default connect(mapStateToProps, null)(Checkout);