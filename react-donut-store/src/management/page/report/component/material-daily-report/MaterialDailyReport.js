import React, { Component } from 'react';
import { CONFIG } from '../../../../../share/constant/configuration.constant';
import * as Helper from '../../../../../share/common/helper/Helper';
import { findList } from './MaterialDailyReportApiCaller';
import { connect } from 'react-redux';
import { fetAllStore } from '../../../../../redux/action/store.constant';
import { fetAllMaterial } from '../../../../../redux/action/material.constant';
import CustomSelect from '../../../../../share/common/custom-select/CustomSelect';
import CustomDate from '../../../../../share/common/custom-datetime/CustomDate';
import { MODEL_ROUTING } from '../../../../../share/constant/routing.constant';
import RedirectQueryParams from '../../../../../share/util/RedirectQueryParams';
import './MaterialDailyReport.css';
import { isAdmin } from '../../../../../auth/util';
import { findCoutingMaterialIn } from '../../ReportApiCaller';
const queryString = require('query-string');

class MaterialDailyReport extends Component {

  constructor(props) {
    super(props);
    this.state = {
      listMaterialIn: [],
      listReport: {},
      params: {
        storeCode: '',
        startDate: '',
        endDate: '',
        page: 0,
        size: CONFIG.PAGE_SIZE,
        sort: 'id,desc'
      },
      isSubmitting: false,
    }
  }

  componentDidMount() {
    if (this.props.listStore.length === 0)
      this.props.fetchAllStore();
    if (this.props.listMaterial.length === 0)
      this.props.fetchAllMaterial();
    this.findListReport();
    this.findCountingMaterialIn();
  }

  componentWillReceiveProps({ location }) {
    const queryParam = queryString.parse(location.search);
    if (location.search !== '') {
      this.setState({
        params: {
          storeCode: queryParam.storeCode ? queryParam.storeCode : '',
          startDate: queryParam.startDate ? queryParam.startDate : '',
          endDate: queryParam.endDate ? queryParam.endDate : '',
          page: queryParam.page ? queryParam.page : 0,
          size: queryParam.size ? queryParam.size : CONFIG.PAGE_SIZE,
          sort: queryParam.sort ? queryParam.sort : 'id,desc'
        },
      }, () => {
        this.findListReport();
        this.findCountingMaterialIn();
      });
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

  showDailyReport = () => {
    return (this.state.listReport.content && this.state.listReport.content.length > 0) ? (
      this.state.listReport.content.map((report, index) => {
        return (
          <div key={index} className="card single-daily-report">
            <h5 className="card-title">Ngày : {new Date(report.dateCreated).toLocaleString('vi-VN')} - Cửa hàng: {report.storeId.name}</h5>
            <div className="flex-report">
              {this.showMaterialReport(report.listMaterialReport)}
            </div>
          </div>
        )
      })
    ) : 'No data'
  }

  showMaterialReport = (list) => {
    return (list.length > 0) ? (
      list.map((report, index) => {
        return <div key={index} className="single-flex">
          <h4>{report.materialId.name} :</h4>
          <p>In : {report.in} - Remain : {report.remain}</p>
          <p>Description: {report.description}</p>
        </div>
      })
    ) : null;
  }

  showTotalIn = () => {
    const { listMaterialIn } = this.state;
    return listMaterialIn.length > 0 ? (
      listMaterialIn.map((material, index) => {
        return (
          <div key={index} className="single-flex">
            <h4>{material.name} :</h4>
            <p>Total In : {material.totalIn}</p>
          </div>
        )
      })
    ) : null;
  }
  first = () => {
    if (!this.props.listReport.first) {
      this.setState({
        params: Object.assign({}, this.state.params, {
          page: 0,
        })
      }, () => {
        this.findListReport();
      });
    }
  }
  prev = () => {
    if (!this.props.listReport.first) {
      this.setState({
        params: Object.assign({}, this.state.params, {
          page: this.props.listReport.number - 1,
        })
      }, () => {
        this.findListReport();
      });
    }
  }
  next = () => {
    if (!this.props.listReport.last) {
      this.setState({
        params: Object.assign({}, this.state.params, {
          page: this.props.listReport.number + 1,
        })
      }, () => {
        this.findListReport();
      });
    }
  }
  last = () => {
    if (!this.props.listReport.last) {
      this.setState({
        params: Object.assign({}, this.state.params, {
          page: this.props.listReport.totalPages - 1,
        })
      }, () => {
        this.findListReport();
      });
    }
  }
  showPagination = () => {
    const { totalPages } = this.state.listReport;
    return (totalPages) ? (<p>
      Page {(totalPages === 0) ? 0 : this.state.listReport.number + 1} of {totalPages}
    </p>) : (<p>Page 0 of 0</p>);
  }

  findReport = () => {
    const { storeCode, startDate, endDate, size, sort } = this.state.params;
    const listSearch = [
      { name: 'storeCode', value: storeCode },
      { name: 'startDate', value: startDate },
      { name: 'endDate', value: endDate },
      { name: 'size', value: size },
      { name: 'sort', value: sort },
    ]
    this.props.history.push(RedirectQueryParams(MODEL_ROUTING.MANAGEMENT + MODEL_ROUTING.REPORT, listSearch));
  }

  findCountingMaterialIn = () => {
    if (this.state.params.storeCode !== '') {
      findCoutingMaterialIn(this.state.params).then(({ data }) => {
        this.setState({
          listMaterialIn: data
        }, () => {
          console.log(data)
        })
      })
    }
  }

  findListReport = () => {
    Helper.setLoading(true);
    this.setState({
      isSubmitting: true,
    });
    findList(this.state.params).then(({ data }) => {
      Helper.setLoading(false);
      this.setState({
        isSubmitting: false,
        listReport: data,
      });
    }).catch(({ response }) => {
      Helper.setLoading(false);
      this.setState({
        isSubmitting: false,
      }, () => alert(response ? response.data : 'Something went wrongs!'));
    })
  }

  render() {
    return (
      <div className="container-fluid page-min-height">
        <div className="row main-row padding-top1">
          {isAdmin() ? (
            <div className="col-md-4 col-lg-2">
              <CustomSelect placeholder="Cửa hàng" name="storeCode" value={this.state.params.storeCode} required={false}
                data={this.props.listStore} onEmittedValue={this.onReceivedSelectValue} />
            </div>
          ) : null}
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
          <div className={`col-md-8 ${isAdmin() ? 'col-lg-6' : 'col-lg-8'}`}>
            <div className="float-right">
              <button type="button" className="btn btn-outline-success" data-tip="Lọc đơn hàng" onClick={this.findReport}><i className="fas fa-filter"></i></button>
            </div>
          </div>
        </div>
        <hr />
        <div className="total-material-in-flex">
          {this.showTotalIn()}
        </div>
        {this.showDailyReport()}
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
    listMaterial: state.materialReducer,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllStore: () => {
      dispatch(fetAllStore());
    },
    fetchAllMaterial: () => {
      dispatch(fetAllMaterial());
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MaterialDailyReport);