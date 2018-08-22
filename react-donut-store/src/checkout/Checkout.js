import React, { Component } from 'react';
import './Checkout.css';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { ROUTING_URL, MENU_NAME } from '../share/constant/routing.constant';
import Breadcrumb from '../main/component/bread-crumb/Breadcrumb';
import CustomInput from '../share/common/custom-input/CustomInput';
import CustomSelect from '../share/common/custom-select/CustomSelect';
import { fetAllStore } from '../redux/action/store.constant';
import GGMapsWithDirection from '../main/component/gg-maps/GGMapsWithDirection';
import NumberFormat from 'react-number-format';
import { isFormValid } from '../share/common/custom-validation';
import { createOrder } from './OrderApiCaller';
import * as Helper from '../share/common/helper/Helper';
import { capchaKey } from '../enviroment';
import { LOCAL_STORAGE } from '../share/constant/local-storage.constant';
import RedirectQueryParams from '../share/util/RedirectQueryParams';

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
  onLoad = () => {
    if (window.grecaptcha) {
      window.grecaptcha.render("recaptcha", {
        sitekey: capchaKey,
        size: "invisible",
        callback: this.onCaptcheCompleted,
        render: "explicit",
      });
    }
  };
  onCaptcheCompleted = e => {
    //do what ever you want
    const { nameCreated, phone, storeCode, addressShipping, distance, shippingPrice } = this.state;
    const newOrder = {
      uvresp: e,
      nameCreated: nameCreated.value,
      phone: phone.value,
      storeCode: storeCode.value,
      addressShipping: addressShipping.value,
      distance: distance.value,
      shippingPrice: shippingPrice.value,
      totalPrice: +this.props.quantity.totalPrice + +this.state.shippingPrice.value,
      quantities: this.props.quantity.quantities,
    }
    createOrder(newOrder).then(({ data }) => {
      this.setState({
        isSubmitting: false,
      })
      Helper.setLoading(false);
      localStorage.removeItem(LOCAL_STORAGE.ORDER);
      this.props.history.push(RedirectQueryParams(ROUTING_URL.DETAIL_ORDER, [{name: 'orderCode', value: data}]));
    }).catch(e => {
      console.log(e);
      Helper.setLoading(false);
      this.setState({
        isSubmitting: false,
      })
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      dateUpdated: '',
      nameCreated: { value: '', valid: false },
      phone: { value: '', valid: false },
      storeCode: { value: 'STOsfgtjnm', valid: true },
      addressShipping: { value: '', valid: false },
      distance: { value: '', valid: false },
      shippingPrice: { value: '', valid: false },
      showMap: true,
      wasSubmitted: false,
      isSubmitting: false,
    }
  }

  componentDidMount() {
    if (this.props.listStore.length === 0)
      this.props.fetchAllStore();
    this.onLoad();
  }

  onReceivedValue = (event) => {
    this.setState({
      [event.name]: { value: event.value, valid: event.valid },
    });
  }

  showGGMaps = () => {
    const { listStore } = this.props;
    return (listStore.length > 0 && this.state.storeCode.value !== '' && this.state.showMap) ? (
      <div className="col-12 col-lg-11">
        <GGMapsWithDirection store={listStore.find(i => i.code === this.state.storeCode.value)}
          onEmittedAddress={this.onReceivedValue} onEmittedDistance={this.onReceivedValue} onEmittedShippingPrice={this.onReceivedValue} />
      </div>
    ) : null;
  }

  onReceivedSelectValue = (event) => {
    this.setState({
      storeCode: { value: event.value, valid: event.valid },
      addressShipping: { value: '', valid: false },
      distance: { value: '', valid: false },
      shippingPrice: { value: '', valid: false },
      showMap: false,
    }, () => {
      this.setState({
        showMap: true,
      });
    });
  }

  showInfoShipment = () => {
    return this.state.addressShipping.valid ? (
      <div className="row">
        <p className="col-12">Địa chỉ: {this.state.addressShipping.value}</p>
        <p className="col-6">Phí vận chuyển: <NumberFormat value={this.state.shippingPrice.value} displayType={'text'} thousandSeparator={true} />₫</p>
        <p className="col-6">Khoảng cách: {this.state.distance.value}</p>
      </div>
    ) : (!this.state.addressShipping.valid && this.state.wasSubmitted) ? (
      <div className="row">
        <p className="col-12 field-required">Vui lòng nhập địa chỉ của bạn</p>
      </div>
    ) : null;
  }

  showQuantites = () => {
    const { quantities } = this.props.quantity;
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

  onSubmit = (event) => {
    event.preventDefault();
    const { nameCreated, phone, storeCode, addressShipping, distance, shippingPrice } = this.state;
    if (isFormValid([nameCreated, phone, storeCode, addressShipping, distance, shippingPrice])) {
      Helper.setLoading(true);
      this.setState({
        isSubmitting: true,
      });
      window.grecaptcha.execute();

    } else {
      this.setState({
        wasSubmitted: true,
      });
    }
  }

  render() {
    const totalPrice = +this.props.quantity.totalPrice + +this.state.shippingPrice.value;
    return (
      <div id="check-out" className="container-fluid">
        <div className="row">
          <div id='recaptcha'></div>
          <form onSubmit={this.onSubmit} className="container buyer-info">
            <div className="buyer-header">
              <h3>Bánh rán Hoàn</h3>
              <Breadcrumb listBreadcrumb={listBreadcrumb} />
            </div>
            <div className="row buyer-step">
              <div className="col-12 col-lg-11">
                <h5>Thông tin giao hàng</h5>
              </div>
              <div className="col-12 col-lg-11">
                <CustomInput type='text' placeholder="Tên của bạn" name="nameCreated" value={this.state.nameCreated.value}
                  maxLength={20} onEmittedValue={this.onReceivedValue} wasSubmitted={this.state.wasSubmitted} />
              </div>
              <div className="col-12 col-lg-11">
                <div className="row">
                  <div className="col-12 col-md-6">
                    <CustomInput type='text' placeholder="Số điện thoại" name="phone" value={this.state.phone.value}
                      maxLength={12} onEmittedValue={this.onReceivedValue} wasSubmitted={this.state.wasSubmitted} />
                  </div>
                  <div className="col-12 col-md-6">
                    {/* <CustomInput type='datetime-local' required={true}
                      placeholder="Thời gian giao hàng" name="dateUpdated" value={this.state.dateUpdated}
                      maxLength={12} onEmittedValue={this.onReceivedValue} /> */}
                    <CustomSelect placeholder="Tại cửa hàng" name="storeCode" value={this.state.storeCode.value}
                      data={this.props.listStore} onEmittedValue={this.onReceivedSelectValue} wasSubmitted={this.state.wasSubmitted} />
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-11">
                {this.showInfoShipment()}
              </div>
              {this.showGGMaps()}
              <div className="col-12 col-lg-11 padding-top1">
                <div className="row">
                  <div className="col-6" style={{ paddingTop: '10px' }}>
                    <NavLink to={ROUTING_URL.ORDER}><span><i className="fas fa-angle-left"></i> {MENU_NAME.ORDER}</span></NavLink>
                  </div>
                  <div className="col-6">
                    <div className="float-right">
                      <button type="submit" disabled={this.state.isSubmitting} className="btn btn-primary"><span>Xác nhận đặt hàng</span></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>

          <div className="container slide-item">
            <div className="row">
              <div className="col-12 col-lg-11 offset-lg-1">
                {this.showQuantites()}
                <hr />
                <div className="row">
                  <div className="col-6"><span>Tạm tính:</span></div>
                  <div className="col-6"><span className="float-right"><NumberFormat value={this.props.quantity.totalPrice} displayType={'text'} thousandSeparator={true} />₫</span></div>
                </div>
                <div className="row">
                  <div className="col-6"><span>Phí vận chuyển:</span></div>
                  <div className="col-6"><span className="float-right"><NumberFormat value={(this.state.shippingPrice.value === '') ? 0 : this.state.shippingPrice.value} displayType={'text'} thousandSeparator={true} />₫</span></div>
                </div>
                <hr />
                <div className="row" style={{ color: 'black' }}>
                  <div className="col-6"><h5>Tổng cộng:</h5></div>
                  <div className="col-6"><h5 className="float-right"><NumberFormat value={totalPrice} displayType={'text'} thousandSeparator={true} />₫</h5></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    quantity: state.quantityReducer,
    listStore: state.storeReducer,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchAllStore: () => {
      dispatch(fetAllStore());
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
