import React, { Component } from 'react';
import './Checkout.css';
import { connect } from 'react-redux';
import { ROUTING_URL, MENU_NAME } from '../share/constant/routing.constant';
import Breadcrumb from '../main/component/bread-crumb/Breadcrumb';
import CustomInput from '../share/common/custom-input/CustomInput';
import CustomSelect from '../share/common/custom-select/CustomSelect';
import { fetAllStore } from '../redux/action/store.constant';
import GGMapsWithDirection from '../main/component/gg-maps/GGMapsWithDirection';

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
      storeCode: 'STOsfgtjnm',
      addressShipping: '',
      distance: '',
      shippingPrice: '',
      totalPrice: '',
      showMap: true,
    }
  }

  componentDidMount() {
    if (this.props.listStore.length === 0)
      this.props.fetchAllStore();
  }

  onReceivedValue = (event) => {
    this.setState({
      [event.name]: event.value,
    });
  }

  showGGMaps = () => {
    const { listStore } = this.props;
    // let result = null;
    // if (listStore.length > 0 && this.state.storeCode !== '') {
    //   const store = listStore.find(i => i.code === this.state.storeCode);
    //   console.log(store);
    //   result = (<div>123</div>)
    // }
    // return result;
    return (this.state.showMap && this.state.storeCode === '' && listStore.length === 0) ? null : (
      <div className="col-12 col-md-11">
        <GGMapsWithDirection store={listStore.find(i => i.code === this.state.storeCode)} 
          onEmittedAddress={this.onReceivedValue} onEmittedDistance={this.onReceivedValue} onEmittedShippingPrice={this.onReceivedValue}/>
      </div>
    );
  }

  onReceivedSelectValue = (event) => {
    this.setState({
      storeCode: event.value,
      addressShipping: '',
      distance: '',
      shippingPrice: '',
      showMap: false,
    });
    setTimeout(() => {
      console.log('timeout',event);
      this.setState({
        showMap: true,
      });
    },1000);
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
                  <div className="col-12 col-md-6">
                    {/* <CustomInput type='datetime-local' required={true}
                      placeholder="Thời gian giao hàng" name="dateUpdated" value={this.state.dateUpdated}
                      maxLength={12} onEmittedValue={this.onReceivedValue} /> */}
                    <CustomSelect required={true}
                      placeholder="Tại cửa hàng" name="storeCode" value={this.state.storeCode}
                      data={this.props.listStore} onEmittedValue={this.onReceivedSelectValue} />
                  </div>
                  <div className="col-12 col-md-6">
                    <CustomInput type='text' required={true}
                      placeholder="Số điện thoại" name="phone" value={this.state.phone}
                      maxLength={12} onEmittedValue={this.onReceivedValue} />
                  </div>
                </div>
              </div>
              {this.showGGMaps()}
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