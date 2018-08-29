import React, { Component } from 'react';
import './SingleOrderManagement.css';
import NumberFormat from 'react-number-format';
import CustomSelect from '../../../share/common/custom-select/CustomSelect';
import { changeStatus } from '../../page/order/OrderApiCaller';
import * as Helper from '../../../share/common/helper/Helper';
import UpdateOrder from '../../page/order/component/update-order/UpdateOrder';
import ReactTooltip from 'react-tooltip';

class SingleOrderManagement extends Component {

  constructor(props) {
    super(props);
    this.state = {
      statusId: '',
      showUpdateModal: false,
    }
  }
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

  showChangeStatus = (statusId) => {
    const { listOrderStatus } = this.props;
    const currentIndex = listOrderStatus.findIndex(i => +i.id === +statusId);
    return (+statusId === 5 || +statusId === 4) ? null : (
      <CustomSelect placeholder="Đổi trạng thái" name="statusId" value={this.state.statusId} required={false}
        data={listOrderStatus.slice(currentIndex + 1)} onEmittedValue={this.onReceivedSelectValue} />
    );
  }

  onReceivedSelectValue = (event) => {
    this.setState({
      statusId: event.value
    }, () => {
      Helper.setLoading(true);
      changeStatus({ code: this.props.order.code, statusId: event.value }).then((response) => {
        Helper.setLoading(false);
        this.props.onEmittedValue({
          name: 'change-status',
        });
      }).catch(error => {
        Helper.setLoading(false);
      });
    });
  }

  onClick = () => {
    this.setState({
      showUpdateModal: true,
    });
  }

  onReceivedValue = (event) => {
    this.setState({
      [event.name]: event.value
    }, () => {
      if (event.name === 'showUpdateModal') {
        this.props.onEmittedValue({
          name: 'close-modal-update',
        });
      }
    });
  }

  showEditButton = () => {
    const { order } = this.props;
    return ((order.shipping && (+order.statusId.id === 1 || +order.statusId.id === 2)) || (!order.shipping && (+order.statusId.id === 2 || +order.statusId.id === 3))) ? (
      <button className="btn btn-outline-info" data-tip="Chỉnh sửa" onClick={this.onClick}><i className="fas fa-edit"></i></button>
    ) : null;
  }

  closeDoNotModal = () => {
    this.setState({
      showUpdateModal: false
    })
  }
  render() {
    const { order } = this.props;
    return order ? (
      <div id="single-order-management" className="card">
        <div className="detail-header">
          <div className="row">
            <div className="col-12 col-md-9">
              <span className={`status ${order.statusId.name}`}>{order.statusId.description}</span>&nbsp;
              <span className="normal-text">Đơn hàng </span>
              <span className="title-text">{order.code}</span>
              <span className="normal-text"> từ</span>
              <span className="title-text"> {order.nameCreated}</span>
              <span className="normal-text"> với giá trị </span>
              <span className="title-text"><NumberFormat value={order.totalPrice} displayType={'text'} thousandSeparator={true} />₫</span>
            </div>
            <div className="col-12 col-md-3">
              <div className="row">
                <div className="col-8 col-sm-8 col-lg-9 col-xl-6 offset-xl-3 main-row">
                  {this.showChangeStatus(order.statusId.id)}
                </div>
                <div className="col-4 col-sm-4 col-lg-3">
                  <div className="float-right">
                    {this.showEditButton()}
                  </div>
                </div>
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
                {order.shipping ? (
                  <div className="row">
                    <div className="col-6"><span>Địa chỉ:</span></div>
                    <div className="col-6"><span className="float-right">{order.addressShipping}</span></div>
                  </div>) : null}
                {order.shipping ? (
                  <div className="row">
                    <div className="col-6"><span>Phí ship:</span></div>
                    <div className="col-6"><span className="float-right"><NumberFormat value={order.shippingPrice} displayType={'text'} thousandSeparator={true} />₫</span></div>
                  </div>
                ) : (
                    <div className="row">
                      <span className="col-12">Dùng luôn / Đến lấy</span>
                    </div>
                  )}
                <div className="row">
                  <div className="col-6"><span>Phone:</span></div>
                  <div className="col-6"><span className="float-right">{order.phone}</span></div>
                </div>
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
        {this.state.showUpdateModal ? <UpdateOrder order={this.props.order} onEmittedCloseModal={this.onReceivedValue} onEmittedCloseDoNotModal={this.closeDoNotModal}/> : null}
        <ReactTooltip />
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