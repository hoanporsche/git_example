import React, { Component } from 'react';
import './OrderReport.css';
import { selectReportDay } from '../../../../../share/constant/configuration.constant';
import CustomSelect from '../../../../../share/common/custom-select/CustomSelect';
import CustomDate from '../../../../../share/common/custom-datetime/CustomDate';
import { connect } from 'react-redux';
import { CONFIG } from '../../../../../share/constant/configuration.constant';
import { fetAllStore } from '../../../../../redux/action/store.constant';
import { findCoutingInfo, findOrderList } from '../../ReportApiCaller';
import NumberFormat from 'react-number-format';
import FlexReport from '../../../../component/flex-report/FlexReport';
import { isAdmin } from '../../../../../auth/util';
import { MODEL_ROUTING } from '../../../../../share/constant/routing.constant';
import RedirectQueryParams from '../../../../../share/util/RedirectQueryParams';
import * as Helper from '../../../../../share/common/helper/Helper';
const queryString = require('query-string');

class OrderReport extends Component {

  constructor(props) {
    super(props);
    this.state = {
      params: {
        rangeTime: 'A_DAY',
        storeCode: '',
        startDate: '',
        endDate: '',
        page: 0,
        size: CONFIG.PAGE_SIZE,
        sort: 'code,desc'
      },
      countingInfo: undefined,
      listOrder: {},
    }
  }

  onReceivedSelectValue = (event) => {
    this.setState({
      params: Object.assign({}, this.state.params, { [event.name]: event.value })
    }, () => {
      if (event.name === 'rangeTime') {
        this.setState({
          params: Object.assign({}, this.state.params, {
            startDate: '',
            endDate: '',
          })
        });
      }
      if (event.name === 'startDate' | event.name === 'endDate') {
        this.setState({
          params: Object.assign({}, this.state.params, {
            rangeTime: '',
          })
        });
      }
    });
  }

  componentDidMount() {
    if (this.props.listStore.length === 0)
      this.props.fetchAllStore();
  }

  componentWillReceiveProps({ location }) {
    const queryParam = queryString.parse(location.search);
    if (location.search !== '') {
      this.setState({
        params: {
          rangeTime: queryParam.rangeTime ? queryParam.rangeTime : 'A_DAY',
          storeCode: queryParam.storeCode ? queryParam.storeCode : '',
          startDate: queryParam.startDate ? queryParam.startDate : '',
          endDate: queryParam.endDate ? queryParam.endDate : '',
          page: queryParam.page ? queryParam.page : 0,
          size: queryParam.size ? queryParam.size : CONFIG.PAGE_SIZE,
          sort: queryParam.sort ? queryParam.sort : 'id,desc'
        },
      }, () => {
        this.findReport();
      });
    }
  }

  findReport = () => {
    const paramsCoutingInfo = {
      rangeTime: this.state.params.rangeTime,
      storeCode: this.state.params.storeCode,
      startDate: this.state.params.startDate,
      endDate: this.state.params.endDate,
    }
    Helper.setLoading(true);
    findCoutingInfo(paramsCoutingInfo).then(({ data }) => {
      this.setState({
        countingInfo: data,
      });
      Helper.setLoading(false);
    }).catch(({response}) => {
      Helper.setLoading(false);
      Helper.validateResponse(response);
    });
    this.onFilter();
  }

  showCountingInfo = () => {
    const { countingInfo } = this.state;
    return countingInfo ? (
      <ul className="flex-report">
        <li className="single-flex">
          <div className="flex-container">
            <h4>Tổng đơn :</h4>
            <p>{countingInfo.totalOrder}</p>
          </div>
        </li>
        <li className="single-flex">
          <div className="flex-container">
            <h4>Đơn tại chỗ :</h4>
            <p>{countingInfo.totalNotShipping}</p>
          </div>
        </li>
        <li className="single-flex">
          <div className="flex-container">
            <h4>Đơn giao đi :</h4>
            <p>{countingInfo.totalShipping}</p>
          </div>
        </li>
        <li className="single-flex">
          <div className="flex-container">
            <h4>Tổng phí ship :</h4>
            <p><NumberFormat value={countingInfo.totalShippingPrice} displayType={'text'} thousandSeparator={true} />₫</p>
          </div>
        </li>
        <li className="single-flex">
          <div className="flex-container">
            <h4>Tổng thu nhập :</h4>
            <p><NumberFormat value={countingInfo.totalInbound} displayType={'text'} thousandSeparator={true} />₫</p>
          </div>
        </li>
      </ul>
    ) : null;
  }

  redirectOrder = () => {
    const { rangeTime, storeCode, startDate, endDate, page, size, sort } = this.state.params;
    const listSearch = [
      { name: 'rangeTime', value: rangeTime },
      { name: 'storeCode', value: storeCode },
      { name: 'startDate', value: startDate },
      { name: 'endDate', value: endDate },
      { name: 'page', value: page },
      { name: 'size', value: size },
      { name: 'sort', value: sort },
    ]
    this.props.history.push(RedirectQueryParams(MODEL_ROUTING.MANAGEMENT + MODEL_ROUTING.REPORT + MODEL_ROUTING.ORDER_REPORT, listSearch));
  }

  first = () => {
    if (!this.state.listOrder.first) {
      this.setState({
        params: Object.assign({}, this.state.params, {
          page: 0,
        })
      }, () => {
        this.onFilter();
      });
    }
  }
  prev = () => {
    if (!this.state.listOrder.first) {
      this.setState({
        params: Object.assign({}, this.state.params, {
          page: this.state.listOrder.number - 1,
        })
      }, () => {
        this.onFilter();
      });
    }
  }
  next = () => {
    if (!this.state.listOrder.last) {
      this.setState({
        params: Object.assign({}, this.state.params, {
          page: this.state.listOrder.number + 1,
        })
      }, () => {
        this.onFilter();
      });
    }
  }
  last = () => {
    if (!this.state.listOrder.last) {
      this.setState({
        params: Object.assign({}, this.state.params, {
          page: this.state.listOrder.totalPages - 1,
        })
      }, () => {
        this.onFilter();
      });
    }
  }
  showPagination = () => {
    const { totalPages } = this.state.listOrder;
    return (totalPages) ? (<p>
      Page {(totalPages === 0) ? 0 : this.state.listOrder.number + 1} of {totalPages}
    </p>) : (<p>Page 0 of 0</p>);
  }

  onFilter = () => {
    Helper.setLoading(true);
    findOrderList(this.state.params).then(({ data }) => {
      this.setState({
        listOrder: data,
      });
      Helper.setLoading(false);
    }).catch(({response}) => {
      Helper.setLoading(false);
      Helper.validateResponse(response);
    });
  }
  showListOrder = () => {
    const { listOrder } = this.state;
    return (listOrder.content && listOrder.content.length > 0) ? (
      listOrder.content.map((order, index) => {
        return <tr key={index}>
          <th scope="row">{index}</th>
          <td>{order.code}</td>
          <td>{new Date(order.dateCreated).toLocaleString('vi-VN')}</td>
          <td>{order.nameCreated}</td>
          <td>{order.statusId.name}</td>
          <td>{order.shipping ? 'Giao đi' : 'Tại chỗ'}</td>
          <td><NumberFormat value={order.totalPrice} displayType={'text'} thousandSeparator={true} />₫</td>
        </tr>
      })
    ) : null;
  }
  showListQuantity = () => {
    const reportQuantityJsons = this.state.countingInfo ? this.state.countingInfo.reportQuantityJsons : undefined;
    const listFlex = [];
    let result = null;
    if (reportQuantityJsons && reportQuantityJsons.length > 0) {
      reportQuantityJsons.forEach(i => {
        listFlex.push({
          name: i.itemName,
          sum: i.totalQuantity,
        });
      });
      result = (<FlexReport listFlex={listFlex} />);
    }
    return result;
  }
  render() {
    return (
      <div id="order-report" className="container-fluid page-min-height">
        <div className="row main-row padding-top1">
          {isAdmin() ? (
            <div className="col-md-4 col-lg-2">
              <CustomSelect placeholder="Cửa hàng" name="storeCode" value={this.state.params.storeCode} required={false}
                data={this.props.listStore} onEmittedValue={this.onReceivedSelectValue} />
            </div>
          ) : null}
          <div className="col-md-4 col-lg-2">
            <CustomSelect placeholder="Khoảng thời gian" name="rangeTime" value={this.state.params.rangeTime} required={false}
              data={selectReportDay} onEmittedValue={this.onReceivedSelectValue} />
          </div>
          <div className="col-md-4 col-lg-2">
            <div className="form-group">
              <CustomDate name="startDate" placeholder="Từ ngày" value={this.state.params.startDate} onEmittedValue={this.onReceivedSelectValue} />
            </div>
          </div>
          <div className="col-md-4 col-lg-2">
            <div className="form-group">
              <CustomDate name="endDate" placeholder="đến ngày" value={this.state.params.endDate} onEmittedValue={this.onReceivedSelectValue} />
            </div>
          </div>
          <div className={`col-md-8 ${isAdmin() ? 'col-lg-4' : 'col-lg-6'}`}>
            <div className="float-right">
              <button type="button" className="btn btn-outline-success" data-tip="Lọc đơn hàng" onClick={this.redirectOrder}><i className="fas fa-filter"></i></button>
            </div>
          </div>
        </div>
        <hr />
        <div className="row padding-top1">
          <div className="col-12">{this.showCountingInfo()}</div>
          <div className="col-12">{this.showListQuantity()}</div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Code</th>
                <th scope="col">Date Created</th>
                <th scope="col">Customer</th>
                <th scope="col">Status</th>
                <th scope="col">Shipping/Not</th>
                <th scope="col">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {this.showListOrder()}
            </tbody>
          </table>
        </div>
        <div className="row padding-top1">
          <div className="col-12">
            <div className="float-right">
              <div className="btn-group btn-group-sm" role="group">
                <button type="button" className="btn btn-outline-info" onClick={this.first}><i className="fas fa-angle-double-left"></i></button>
                <button type="button" className="btn btn-outline-info" onClick={this.prev}><i className="fas fa-angle-left"></i></button>
              </div>
              <div className="pagination__page-number">
                {this.showPagination()}
              </div>
              <div className="btn-group btn-group-sm" role="group">
                <button type="button" className="btn btn-outline-info" onClick={this.next}><i className="fas fa-angle-right"></i></button>
                <button type="button" className="btn btn-outline-info" onClick={this.last}><i className="fas fa-angle-double-right"></i></button>
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
    listStore: state.storeReducer,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllStore: () => {
      dispatch(fetAllStore());
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderReport);