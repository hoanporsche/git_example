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

  onPrint = () => {
    const { order } = this.props;
    let popupWinindow;
    let pr = `
      <div id="invoice-POS">
        
        <div id="mid">
          <div class="info">
            <h2>Bánh rán Hoàn</h2>
            <h5>${order.storeId.address}</h5>
            <h5>ĐT: ${order.storeId.phone}</h5>
            <hr/>
            <b>Ngày tháng:</b> <span>${new Date().toLocaleString('vi-VN')}</span> <br>
            <b>Khách hàng:</b> <span>Anh/chị ${order.nameCreated}</span> <br>
            <b>Địa chỉ:</b> <span>${order.shipping ? order.addressShipping : 'Khách dùng tại chỗ'}</span> <br>
            <b>Điện thoại:</b> <span>${order.phone}</span> <br>
          </div>
        </div>
        <hr/>
        <div id="bot">
        <div class="info">
          <b>Mã đơn hàng:</b> ${order.code} <br>
        </div>
        <table class="tieude">
          <tr>
            <th>Sản phẩm</th>
            <th>Đ.Giá</th>
            <th>SL</th>
            <th class="soluong">T.Tiền</th>
          </tr>`
    let a = ''
    order.quantities.forEach(quantity => {
      a += `<tr><td style="width: 50%;"><p>${quantity.itemId.name.toUpperCase()}</p></td>
        <td><p>${(+quantity.itemId.singleValue).toLocaleString()}</p></td>
        <td><p>${quantity.quantity}</p></td>
        <td><p class="soluong">${(+(quantity.quantity * quantity.itemId.singleValue)).toLocaleString()}</p></td></tr>`
    })
    pr += a;

    pr += `
          </table>
          <div style="width:100%;display: inline-flex; margin: 0 0;">
            <div style="width:50%">
                <p>Tổng cộng:</p>
            </div>
            <div style="width:50%">
              <p style="float: right;">${order.shipping ? (+(order.totalPrice - order.shippingPrice)).toLocaleString() : (+order.totalPrice).toLocaleString()}₫</p>
            </div>
          </div>
          <div style="width:100%;display: inline-flex; margin: -12px 0;">
            <div style="width:50%">
                <p>Phí ship:</p>
            </div>
            <div style="width:50%">
              <p style="float: right;">${order.shipping ? (+order.shippingPrice).toLocaleString() : 0}₫</p>
            </div>
          </div>
          <div style="width:100%;display: inline-flex;">
            <div style="width:50%">
            <strong>Tổng tiền:</strong>
            </div>
            <div style="width:50%">
            <strong style="float: right;">${(+order.totalPrice).toLocaleString()}₫</strong>
            </div>
          </div>
        </div>
      </div>
      <div id="legalcopy">
        <p>
        <span style="font-size: 1rem;"><i class="fab fa-facebook-square"></i> Bánh rán Hoàn</span>
        </p>
        <p>
        <span style="font-size: 1rem;"><i class="fab fa-instagram"></i> banhranhoan</span>
        </p>
        <p class="legal">
          <strong>Rất hân hạnh được phục vụ quý khách!</strong>
        </p>
      </div>
    `
    popupWinindow = window.open('', '_blank', `width=58mm,height=auto,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no,
    top=0,left=0`);
    popupWinindow.document.open();
    popupWinindow.document.write(`
    <html>
      <head>
        <style>
        HTML, BODY {
          color: #000000;
        }
        #invoice-POS {
          padding: 0mm 10mm 0mm 0mm;
          margin: 0 auto;
          width: 58mm;
        }
        h2 {
          text-align: center;
          margin: 1em 0 0 0;
        }
        h5 {
          text-align: center;
          margin: 0
        }
        .tieude{
          width: 100%;
          margin-bottom: 1rem;
          background-color: transparent;
          margin-top: 1em;
        }
        table {
          border-collapse: collapse;
          width: 100%;
        }
        td {
          padding: 8px 0px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }
        th {
          padding: 2px 0px;
          text-align: left;
          border-bottom: 1px solid #ddd;
          border-top: 1px solid #ddd;
          font-size:1em;
        }
        p {
          font-size: 0.9em;
          line-height: 1.2em;
        }
        .soluong{
          text-align: right;
        }
        span {
          font-size: 0.7em;
          line-height: 0.8em;
        }
        b {
          font-size:0.7em;
        }
        #mid{
          margin-top: -2mm;
        }
        #legalcopy {
          margin-top: 4mm;
          margin-bottom: 2mm;
          display: block;
          text-align: center;
          padding-right: 10mm;
        }
        </style>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
          crossorigin="anonymous">
      </head>
      <body onload="window.print();window.close()"> 
      <body > 

      ${pr}
      
      </body>
      </html>
    `);
    popupWinindow.document.close();
  }
  render() {
    const { order } = this.props;
    return order ? (
      <div id="single-order-management" className="card">
        <div className="detail-header">
          <div className="row">
            <div className="col-12 col-lg-9">
              <span className={`status ${order.statusId.name}`}>{order.statusId.description}</span>&nbsp;
              <span className="normal-text">Đơn hàng </span>
              <span className="title-text">{order.code}</span>
              <span className="normal-text"> từ</span>
              <span className="title-text"> {order.nameCreated}</span>
              <span className="normal-text"> với giá trị </span>
              <span className="title-text"><NumberFormat value={order.totalPrice} displayType={'text'} thousandSeparator={true} />₫</span>
            </div>
            <div className="col-12 col-lg-3">
              <div className="row">
                <div className="col-7 col-sm-8 col-lg-7 main-row">
                  {this.showChangeStatus(order.statusId.id)}
                </div>
                <div className="col-5 col-sm-4 col-lg-5">
                  <div className="float-right">
                    {this.showEditButton()}&nbsp;
                    <button className="btn btn-outline-secondary" data-tip="In hóa đơn" onClick={this.onPrint}><i className="fas fa-print"></i></button>
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
                  <div className="col-6"><span className="float-right">{(new Date(order.dateCreated)).toLocaleString('vi-VN')}</span></div>
                </div>
                <hr />
                <div className="row" style={{ color: 'black' }}>
                  <div className="col-6"><h5>Cập nhật cuối:</h5></div>
                  <div className="col-6"><h5 className="float-right">{(new Date(order.dateUpdated)).toLocaleString('vi-VN')}</h5></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.state.showUpdateModal ? <UpdateOrder order={this.props.order} onEmittedCloseModal={this.onReceivedValue} onEmittedCloseDoNotModal={this.closeDoNotModal} /> : null}
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