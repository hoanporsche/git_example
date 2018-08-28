import React, { Component } from 'react';
import $ from 'jquery';
import CustomInput from '../../../../../share/common/custom-input/CustomInput';
import CustomSelect from '../../../../../share/common/custom-select/CustomSelect';
import GGMapsWithDirection from '../../../../../main/component/gg-maps/GGMapsWithDirection';
import NumberFormat from 'react-number-format';
import { connect } from 'react-redux';
import { fetAllCategory } from '../../../../../redux/action/category.constant';
import ChooseQuantity from '../../../../../main/component/choose-quantity/ChooseQuantity';
import { save } from '../../OrderApiCaller';
import * as Helper from '../../../../../share/common/helper/Helper';
import { isFormValid } from '../../../../../share/common/custom-validation';
import { CONFIG_NAME } from '../../../../../share/constant/configuration.constant';

let listItem = [];
const selectOption = [
  {
    name: 'Giao đi',
    code: true,
  }, {
    name: 'Đến lấy',
    code: false,
  }
]
class CreateOrder extends Component {
  findMinTotalPrice = () => {
    const { listConfigGlobal } = this.props;
    const value = listConfigGlobal.find(i => i.name === CONFIG_NAME.MIN_TOTAL_PRICE);
    return value ? +value.value : 0;
  }
  constructor(props) {
    super(props);
    this.state = {
      nameCreated: { value: '', valid: false },
      quantities: [],
      phone: { value: '', valid: false },
      storeCode: this.props.currentUser.storeId.code,
      shipping: { value: false, valid: true },
      addressShipping: { value: '', valid: false },
      distance: { value: '', valid: false },
      shippingPrice: { value: '', valid: false },
      totalPrice: 0,
      wasSubmitted: false,
      isSubmitting: false,
    }
  }

  componentDidMount() {
    $('#open-modal-create-order').click();
    if (this.props.listCategory.length === 0) {
      this.props.fetchAllCategory();
    }
  }

  onCloseModal = () => {
    this.props.onEmittedCloseModal({
      name: 'showCreateModal',
      value: false
    });
  }

  onCloseDoNotModal = () => {
    this.props.onEmittedCloseDoNotModal({
      name: 'showCreateModal',
      value: false
    });
  }

  onCreateOrder = () => {
    const { nameCreated, phone, shipping } = this.state;
    if (isFormValid([nameCreated, phone, shipping]) && this.state.quantities.length > 0 && this.state.totalPrice >= this.findMinTotalPrice()) {
      const newOrder = {
        nameCreated: nameCreated.value,
        phone: phone.value,
        addressShipping: this.state.addressShipping.value,
        distance: this.state.distance.value,
        shippingPrice: this.state.shippingPrice.value,
        totalPrice: +this.state.totalPrice,
        quantities: this.state.quantities,
        shipping: shipping.value,
      }
      Helper.setLoading(true);
      this.setState({
        isSubmitting: true,
      });
      save(newOrder).then(() => {
        Helper.setLoading(false);
        this.setState({
          isSubmitting: false,
        }, () => {
          $('#close-create-modal').click();
        });
      }).catch(() => {
        Helper.setLoading(false);
        this.setState({
          isSubmitting: false,
        });
      })
    } else {
      this.setState({
        wasSubmitted: true,
      })
    }
  }

  onReceivedValue = (event) => {
    if (!this.state.isSubmitting) {
      this.setState({
        [event.name]: { value: event.value, valid: event.valid },
      }, () => {
        if (event.name === "shippingPrice") {
          this.setState({
            totalPrice: this.calculateTotalPrice(),
          });
        }
        if (event.name === 'shipping') {
          this.setState({
            addressShipping: { value: '', valid: false },
            distance: { value: '', valid: false },
            shippingPrice: { value: '', valid: false },
          }, () => {
            this.setState({
              totalPrice: this.calculateTotalPrice(),
            });
          });
        }
      })
    }
  }

  showInfoShipment = () => {
    return this.state.addressShipping.valid ? (
      <div className="row">
        <p className="col-12">Địa chỉ: {this.state.addressShipping.value}</p>
        <p className="col-6">Phí vận chuyển: <NumberFormat value={this.state.shippingPrice.value} displayType={'text'} thousandSeparator={true} />₫</p>
        <p className="col-6">Khoảng cách: {this.state.distance.value}</p>
      </div>
    ) : (!this.state.shipping.value.toString() === 'true' && this.state.wasSubmitted) ? (
      <div className="row">
        <p className="col-12 field-required">Vui lòng nhập địa chỉ của bạn</p>
      </div>
    ) : null;
  }

  showIsTooFar = () => {
    return (+this.state.shippingPrice.value > 100000) ? (<p className="col-12 field-required">Đơn hàng của bạn ở quá xa.</p>) : null;
  }

  showGGMaps = () => {
    return (this.state.shipping.value.toString() === 'true') ? (
      <GGMapsWithDirection store={this.props.currentUser.storeId} onEmittedAddress={this.onReceivedValue}
        onEmittedDistance={this.onReceivedValue} onEmittedShippingPrice={this.onReceivedValue} />
    ) : null;
  }

  showCategory = () => {
    return this.props.listCategory.length > 0 ? (
      <div className="col-md-6">
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          {this.props.listCategory.map((category, index) => {
            return (<li key={index} className="nav-item">
              <a className={`nav-link ${index === 0 ? 'active' : ''}`} id={`${category.code}-tab`} data-toggle="tab" href={`#${category.code}`} role="tab" aria-controls="home" aria-selected="true">{category.name}</a>
            </li>)
          })}
        </ul>
        <div className="tab-content" id="myTabContent">
          {this.props.listCategory.map((category, index) => {
            return (
              <div key={index} className={`tab-pane fade ${index === 0 ? 'show active' : ''}`} id={category.code} role="tabpanel" aria-labelledby="home-tab">
                {this.showItemByCategory(category.items)}
              </div>)
          })}
        </div>
      </div>
    ) : null;
  }

  showItemByCategory = (items) => {
    listItem = listItem.concat(items);
    return items.map((item, index) => {
      return (<div key={index} className="row">
        <div className="col-6" style={{ minHeight: '60px' }}>
          <input type="checkbox" name={item.code} onChange={this.onChooseItem} />
          {item.name}
        </div>
        <div className="col-6">
          {(this.state.quantities.length > 0 && this.state.quantities.find(i => i.item.code === item.code))
            ? (<ChooseQuantity name={item.code} onEmittedValue={this.onChooseQuantity} quantity={this.state.quantities.find(i => i.item.code === item.code).quantity} />) : null}
        </div>
      </div>)
    });
  }

  onChooseItem = (event) => {
    const code = event.target.name;
    if (event.target.checked) {
      const foundItem = listItem.find(i => i.code === code);
      this.setState({
        quantities: this.state.quantities.concat({
          item: foundItem,
          quantity: 1,
          price: foundItem.singleValue
        })
      }, () => {
        this.setState({
          totalPrice: this.calculateTotalPrice(),
        })
      });
    } else {
      this.setState({
        quantities: this.state.quantities.filter(i => i.item.code !== code),
      }, () => {
        this.setState({
          totalPrice: this.calculateTotalPrice(),
        })
      });
    }
  }

  calculateTotalPrice = () => {
    let totalPrice = +0 + (this.state.shippingPrice.value === '' ? +0 : +this.state.shippingPrice.value);
    const { quantities } = this.state;
    quantities.forEach(i => {
      totalPrice = totalPrice + i.price;
    });
    return totalPrice;
  }

  //tìm vị trí của item trong list, tạo ra 1 quantity mới, chèn quantity mới vào 1 list mới 
  onChooseQuantity = (event) => {
    const { quantities } = this.state;
    const index = quantities.findIndex(i => i.item.code === event.name);
    const foundItem = quantities.find(i => i.item.code === event.name).item;
    const newQuantity = { item: foundItem, quantity: event.value, price: foundItem.singleValue * event.value };
    const before = quantities.slice(0, index);
    const after = quantities.slice(index + 1);
    const newQuantites = [].concat(before).concat(newQuantity).concat(after);
    this.setState({
      quantities: newQuantites,
    }, () => {
      this.setState({
        totalPrice: this.calculateTotalPrice(),
      })
    })
  }
  render() {
    return (
      <section>
        <button style={{ display: 'none' }} type="button" id="open-modal-create-order"
          data-backdrop={'static'} data-keyboard={false}
          data-toggle="modal" data-target="#modal-create-order">
        </button>
        <div id="modal-create-order" className="modal fade bd-example-modal-lg" tabIndex={-1} role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-4">
                      <CustomInput type='text' placeholder="Tên người nhận" name="nameCreated" value={this.state.nameCreated.value}
                        maxLength={20} onEmittedValue={this.onReceivedValue} wasSubmitted={this.state.wasSubmitted} />
                    </div>
                    <div className="col-md-4">
                      <CustomInput type='text' placeholder="Số điện thoại" name="phone" value={this.state.phone.value}
                        maxLength={12} onEmittedValue={this.onReceivedValue} wasSubmitted={this.state.wasSubmitted} />
                    </div>
                    <div className="col-md-4">
                      <CustomSelect placeholder="Giao đi/đến lấy" name="shipping" value={this.state.shipping.value}
                        data={selectOption} onEmittedValue={this.onReceivedValue} wasSubmitted={this.state.wasSubmitted} />
                    </div>
                  </div>
                  <div className="row">
                    {this.showCategory()}
                    <div className="col-md-6">
                      {this.showIsTooFar()}
                      {this.showGGMaps()}
                      {this.showInfoShipment()}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-4">
                      Tổng: <NumberFormat value={this.state.totalPrice} displayType={'text'} thousandSeparator={true} />₫
                    </div>
                    <div className="col-8">
                      <div className="float-right">
                        <button type="button" style={{display: 'none'}} data-dismiss="modal" aria-label="Close" id="close-create-modal" onClick={this.onCloseModal}></button>
                        <button className="btn btn-outline-dark" disabled={this.state.isSubmitting} onClick={this.onCloseDoNotModal} data-dismiss="modal" aria-label="Close">Quay laị</button>&nbsp;
                        <button className="btn btn-outline-primary" disabled={this.state.isSubmitting || +this.state.shippingPrice > 100000} onClick={this.onCreateOrder}>Tạo</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section >
    );
  }
}

const mapStateToProps = state => {
  return {
    listCategory: state.categoryReducer,
    listConfigGlobal: state.configGlobalReducer,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllCategory: () => {
      dispatch(fetAllCategory());
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateOrder);