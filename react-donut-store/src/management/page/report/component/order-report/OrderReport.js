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

  findReport = () => {
    const paramsCoutingInfo = {
      rangeTime: this.state.params.rangeTime,
      storeCode: this.state.params.storeCode,
      startDate: this.state.params.startDate,
      endDate: this.state.params.endDate,
    }
    findCoutingInfo(paramsCoutingInfo).then(({ data }) => {
      this.setState({
        countingInfo: data,
      })
    }).catch(error => {
      console.log(error);
    });
    this.onFilter();
  }

  showCountingInfo = () => {
    const { countingInfo } = this.state;
    return countingInfo ? (
      <div className="row text-center">
        <div className="col-2">
          <div className="detail-counting-info">
            Tổng đơn :
          <h2>{countingInfo.totalOrder}</h2>
          </div>
        </div>
        <div className="col-2">
          <div className="detail-counting-info">
            Đơn tại chỗ :
          <h2>{countingInfo.totalNotShipping}</h2>
          </div>
        </div>
        <div className="col-2">
          <div className="detail-counting-info">
            Đơn giao đi :
          <h2>{countingInfo.totalShipping}</h2>
          </div>
        </div>
        <div className="col-3">
          <div className="detail-counting-info">
            Tổng phí ship :
          <h2><NumberFormat value={countingInfo.totalShippingPrice} displayType={'text'} thousandSeparator={true} />₫</h2>
          </div>
        </div>
        <div className="col-3">
          <div className="detail-counting-info">
            Tổng thu nhập:
          <h2><NumberFormat value={countingInfo.totalInbound} displayType={'text'} thousandSeparator={true} />₫</h2>
          </div>
        </div>
      </div>
    ) : null;
  }

  first = () => {
    if (!this.props.listOrder.first) {
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
    if (!this.props.listOrder.first) {
      this.setState({
        params: Object.assign({}, this.state.params, {
          page: this.props.listOrder.number - 1,
        })
      }, () => {
        this.onFilter();
      });
    }
  }
  next = () => {
    if (!this.props.listOrder.last) {
      this.setState({
        params: Object.assign({}, this.state.params, {
          page: this.props.listOrder.number + 1,
        })
      }, () => {
        this.onFilter();
      });
    }
  }
  last = () => {
    if (!this.props.listOrder.last) {
      this.setState({
        params: Object.assign({}, this.state.params, {
          page: this.props.listOrder.totalPages - 1,
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
    findOrderList(this.state.params).then(({ data }) => {
      this.setState({
        listOrder: data,
      })
    })
  }
  showListOrder = () => {
    const { listOrder } = this.state;
    return (listOrder.content && listOrder.content.length > 0) ? (
      <div className="row">
        {this.showSingleOrder(listOrder.content)}
      </div>
    ) : null;
  }
  showSingleOrder = (list) => {
    return list.map((order, index) => {
      return <div key={index} className="col-12">
        {new Date(order.dateCreated).toLocaleString()} - {order.nameCreated}
      </div>
    })
  }
  render() {
    return (
      <div id="order-report" className="container-fluid page-min-height">
        OrderReport
        <div className="row main-row">
          <div className="col-md-4 col-lg-2">
            <CustomSelect placeholder="Cửa hàng" name="storeCode" value={this.state.params.storeCode} required={false}
              data={this.props.listStore} onEmittedValue={this.onReceivedSelectValue} />
          </div>
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
          <div className="col-md-4 col-lg-4">
            <div className="float-right">
              <button type="button" className="btn btn-outline-success" data-tip="Lọc đơn hàng" onClick={this.findReport}><i className="fas fa-filter"></i></button>
            </div>
          </div>
        </div>
        <hr />
        {this.showCountingInfo()}
        {this.showListOrder()}
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
    listOrder: state.orderReducer,
    listStore: state.storeReducer,
    listConfigGlobal: state.configGlobalReducer,
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