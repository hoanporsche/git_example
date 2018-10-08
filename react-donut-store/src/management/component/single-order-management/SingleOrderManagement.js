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
            <p>
              Khách hàng: Anh/chị ${order.nameCreated} <br>
              Địa chỉ: ${order.shipping ? order.addressShipping : 'Khách dùng tại chỗ'} <br>
              Điện thoại: ${order.phone} <br>
            </p>
          </div>
        </div>

        <div class="info">
          <p>
            Mã đơn hàng: ${order.code} <br>
          </p>
        </div>
        

        <div id="bot">
              <table>
                <tr class="tieude">
                  <th><strong>Sản phẩm</strong></th>
                  <th><strong>Giá</strong></th>
                 
                  <th><strong>SL</strong></th>
                </tr>`
    let a = ''
    order.quantities.forEach(quantity => {
      a += `<tr><td><p>` + quantity.itemId.name + `</p></td>` +
        `<td><p>` + quantity.itemId.singleValue + `</p></td>` +

        `<td><p class="soluong">` + quantity.quantity + `</p></td></tr>`
    })
    pr += a;

    pr += `
            <tr id="total">
              <td>
                <strong>Phí ship:</strong>
              </td>
              <td class="money">
                <strong>${order.shipping ? order.shippingPrice : 0}</strong>
              </td>
              <td></td>
            </tr>
            <tr id="total">
              <td>
                <strong>Tổng tiền:</strong>
              </td>
              <td class="money">
                <strong>${order.totalPrice}</strong>
              </td>
              <td></td>
            </tr>

            <tr>
              <td>
                <strong>Tổng tiền nhận:</strong>
              </td>
              <td class="money">
                <strong>0</strong>
              </td>
              <td></td>
            </tr>

            <tr>
              <td>
                <strong>Tổng tiền trả:</strong>
              </td>
              <td class="money">
                <strong>0</strong>
              </td>
              <td></td>
            </tr>

          </table>
        </div>
      </div>
      <div id="legalcopy">
        <p class="legal">
          <strong>Rất hân hạnh được phục vụ quý khách!</strong>
        </p>
      </div>
    `
    popupWinindow = window.open('', '_blank', `width=80mm,height=auto,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no,
    top=0,left=0`);
    popupWinindow.document.open();
    popupWinindow.document.write(`
    <html>
      <head>
        <style>

        HTML, BODY {
          color: #000000;
          font-family: monaco, Consolas, "Lucida Console", monospace;
        }
        #invoice-POS {
          padding: 0mm;
          margin: 0 auto;
          width: 80mm;
        }
        h2 {
          font-size: 1.1em;
          text-align: center;
        }
        #tieude{
          margin-top: -20mm;
          display: block;
          text-align: left;
        }
        /* cell*/
        strong {
          font-size: 1em;
          text-align: left;
        }
        p {
          font-size: 0.9em;
          line-height: 1.2em;
        }
        .soluong{
          text-align: right;
          padding-right: 0.5mm;
        }
        span {
          font-size: 0.9em;
          line-height: 0.8em;
        }
        #top {
        }
        #mid{
          margin-top: -2mm;
        }
        #legalcopy {
          margin-top: 4mm;
          margin-bottom: 2mm;
          display: block;
          text-align: center;
        }
        </style>
      </head>
      <body onload="window.print();window.close()"> 

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