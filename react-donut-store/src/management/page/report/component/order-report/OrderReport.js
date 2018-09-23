import React, { Component } from 'react';
import { selectReportDay } from '../../../../../share/constant/configuration.constant';
import CustomSelect from '../../../../../share/common/custom-select/CustomSelect';
import CustomDate from '../../../../../share/common/custom-datetime/CustomDate';
import { connect } from 'react-redux';
import { CONFIG } from '../../../../../share/constant/configuration.constant';
import { fetAllStore } from '../../../../../redux/action/store.constant';
import { findCoutingInfo } from '../../ReportApiCaller';

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
  }

  showCountingInfo = () => {
    const { countingInfo } = this.state;
    return countingInfo ? (
      <div className="row">
        <div className="col-2">
          <h2>Thông tin chung</h2>
        </div>
        <div className="col-2">
          Tổng số : 
          <h2>{countingInfo.totalOrder}</h2>
        </div>
        <div className="col-2">
          Tổng đơn :
          <h2>{countingInfo.totalOrder}</h2>
        </div>
        <div className="col-2">
          Tổng đơn :
          <h2>{countingInfo.totalOrder}</h2>
        </div>
        <div className="col-2">
          Tổng đơn :
          <h2>{countingInfo.totalOrder}</h2>
        </div>
        <div className="col-2">
          Tổng đơn :
          <h2>{countingInfo.totalOrder}</h2>
        </div>
      </div>
    ) : null;
  }
  render() {
    return (
      <div className="container-fluid page-min-height">
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
        {this.showCountingInfo()}
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