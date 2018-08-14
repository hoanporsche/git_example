import React, { Component } from 'react';
import './Order.css';
import SectionHeading from '../../component/section-heading/SectionHeading';
import { connect } from 'react-redux';
import { fetAllStore } from '../../../redux/action/store.constant';
import CustomInput from '../../../share/common/custom-input/CustomInput';
import CustomSelect from '../../../share/common/custom-select/CustomSelect';
import { CHOOSE_IS_SHIPPING } from '../../../share/constant/common.constant';
import GGMapsWithDirection from '../../component/gg-maps/GGMapsWithDirection';

class Order extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dateUpdated: '',
      nameCreated: '',
      phone: '',
      storeCode: 'STOsfgtjnm',
      quantites: [],
      isShipping: false,
      addressShipping: '',
      distance: '',
      shippingPrice: '',
      totalPrice: 0,
    }
    this.onReceivedValue = this.onReceivedValue.bind(this);
  }

  componentDidMount() {
    if (this.props.listStore.length === 0)
      this.props.fetchAllStore();
  }

  onReceivedValue(emittedValue) {
    switch (emittedValue.name) {
      case 'storeCode': {
        this.setState({
          addressShipping: '',
          distance: '',
          shippingPrice: '',
        })
        if (this.state.isShipping.toString() === 'true') {
          this.setState({
            isShipping: false,
          });
          setTimeout(() => {
            this.setState({
              isShipping: true,
            });
          }, 500)
        }
        break;
      }
      case 'isShipping': {
        this.setState({
          [emittedValue.name]: emittedValue.value,
          addressShipping: '',
          distance: '',
          shippingPrice: '',
        });
        break;
      }
      default: {
        this.setState({
          [emittedValue.name]: emittedValue.value,
        });
      }
    }
  }

  showGGMaps = () => {
    if (this.state.isShipping.toString() === 'true'
      && this.state.storeCode !== '') {
      let store = this.props.listStore.find(i => i.code === this.state.storeCode);
      return <GGMapsWithDirection store={store} defaultZoom={13}
        onEmittedAddress={this.onReceivedValue}
        onEmittedDistance={this.onReceivedValue}
        onEmittedShippingPrice={this.onReceivedValue} />
    }
  }

  showSectionShipping = () => {
    if (this.state.addressShipping !== '' && this.state.shippingPrice !== '' && this.state.distance !== '') {
      return (
        <div className="row">
          <div className="col-sm-12">
            <p className="form-control">{this.state.addressShipping}</p>
          </div>
          <div className="col-sm-6">
            <p className="form-control">{this.state.shippingPrice} ngàn đồng</p>
          </div>
          <div className="col-sm-6">
            <p className="form-control">{this.state.distance}</p>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className="wrapper">
        <div className="container contain">
          <SectionHeading title="Đơn hàng mới" />
          <div className="row">
            <div className="col-sm-6">
              <CustomInput type="text" name="nameCreated"
                placeholder="Tên của bạn"
                required={true}
                maxLength={20}
                value={this.state.nameCreated}
                onEmittedValue={this.onReceivedValue} />
            </div>
            <div className="col-sm-6">
              <CustomInput type="datetime-local" name="dateUpdated"
                placeholder="Thời gian lấy hàng"
                required={true}
                value={this.state.dateUpdated}
                onEmittedValue={this.onReceivedValue} />
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6">
              <CustomInput type="text" name="phone"
                placeholder="Số điện thoại của bạn"
                required={true}
                maxLength={20}
                value={this.state.phone}
                onEmittedValue={this.onReceivedValue} />
            </div>
            <div className="col-sm-6">
              <div className="row">
                <div className="col-sm-6">
                  <CustomSelect name="storeCode"
                    placeholder="Cửa hàng"
                    required={true}
                    data={this.props.listStore}
                    value={this.state.storeCode}
                    onEmittedValue={this.onReceivedValue} />
                </div>
                <div className="col-sm-6">
                  <CustomSelect name="isShipping"
                    placeholder="Phương thức nhận hàng"
                    required={true}
                    data={CHOOSE_IS_SHIPPING}
                    value={this.state.isShipping}
                    onEmittedValue={this.onReceivedValue} />
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6">
              {this.showGGMaps()}
            </div>
            <div className="col-sm-6">
              {this.showSectionShipping()}
            </div>
          </div>

        </div>
      </div>
    );
  }

  componentWillUnmount() {
    console.log("Unmount");
  }
}

const mapStateToProps = state => {
  return {
    listQuantity: state.orderReducer,
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
export default connect(mapStateToProps, mapDispatchToProps)(Order);