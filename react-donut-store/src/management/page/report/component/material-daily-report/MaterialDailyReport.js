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
const queryString = require('query-string');

class MaterialDailyReport extends Component {

  constructor(props) {
    super(props);
    this.state = {
      listReport: [],
      params: {
        storeCode: '',
        materialId: '',
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
  }

  componentWillReceiveProps({ location }) {
    const queryParam = queryString.parse(location.search);
    if (location.search !== '') {
      this.setState({
        params: {
          storeCode: queryParam.storeCode ? queryParam.storeCode : '',
          materialId: queryParam.materialId ? queryParam.materialId : '',
          startDate: queryParam.startDate ? queryParam.startDate : '',
          endDate: queryParam.endDate ? queryParam.endDate : '',
          page: queryParam.page ? queryParam.page : 0,
          size: queryParam.size ? queryParam.size : CONFIG.PAGE_SIZE,
          sort: queryParam.sort ? queryParam.sort : 'id,desc'
        },
      }, () => {
        this.findListReport();
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

  first = () => {
    if (!this.props.listReport.first) {
      this.setState({
        params: Object.assign({}, this.state.params, {
          page: 0,
        })
      }, () => {
        this.findReport();
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
        this.findReport();
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
        this.findReport();
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
        this.findReport();
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
    const { storeCode, materialId, startDate, endDate, size, sort } = this.state.params;
    const listSearch = [
      { name: 'storeCode', value: storeCode },
      { name: 'materialId', value: materialId },
      { name: 'startDate', value: startDate },
      { name: 'endDate', value: endDate },
      { name: 'size', value: size },
      { name: 'sort', value: sort },
    ]
    this.props.history.push(RedirectQueryParams(MODEL_ROUTING.MANAGEMENT + MODEL_ROUTING.REPORT, listSearch));
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
      });
      console.log(data);
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
          <div className="col-md-4 col-lg-2">
            <CustomSelect placeholder="Cửa hàng" name="storeCode" value={this.state.params.storeCode} required={false}
              data={this.props.listStore} onEmittedValue={this.onReceivedSelectValue} />
          </div>
          <div className="col-md-4 col-lg-2">
            <CustomSelect placeholder="Nguyên liệu" name="materialId" value={this.state.params.materialId} required={false}
              data={this.props.listMaterial} onEmittedValue={this.onReceivedSelectValue} />
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
          <div className="col-md-8 col-lg-4">
            <div className="float-right">
              <button type="button" className="btn btn-outline-success" data-tip="Lọc đơn hàng" onClick={this.findReport}><i className="fas fa-filter"></i></button>
            </div>
          </div>
        </div>
        <hr />
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