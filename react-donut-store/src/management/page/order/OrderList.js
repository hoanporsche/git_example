import React, { Component } from 'react';
import './OrderList.css';
import { connect } from 'react-redux';
import { CONFIG } from '../../../share/constant/configuration.constant';
import { fetAllStore } from '../../../redux/action/store.constant';
import { fetAllConfigGlobal } from '../../../redux/action/config-global.constant';
import * as orderStatusService from '../config/model/order-status/OrderStatusApiCaller';
import * as Helper from '../../../share/common/helper/Helper';
import CustomSelect from '../../../share/common/custom-select/CustomSelect';
import CustomDate from '../../../share/common/custom-datetime/CustomDate';
import CustomSearchInput from '../../../share/common/custom-search-input/CustomSearchInput';
import SingleOrderManagement from '../../component/single-order-management/SingleOrderManagement';
import CreateOrder from './component/create-order/CreateOrder';
import { LOCAL_STORAGE } from '../../../share/constant/local-storage.constant';
import ReactTooltip from 'react-tooltip';
import RedirectQueryParams from '../../../share/util/RedirectQueryParams';
import { MODEL_ROUTING } from '../../../share/constant/routing.constant';
import { findListOrder } from './OrderApiCaller'; 
const queryString = require('query-string');

const currentUser = JSON.parse(localStorage.getItem(LOCAL_STORAGE.CURRENT_USER));
const selectOption = [
  {
    name: 'Giao đi',
    code: true,
  }, {
    name: 'Đến lấy',
    code: false,
  }
]
class OrderList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      listOrderStatus: [],
      params: {
        startDate: '',
        endDate: '',
        shipping: '',
        storeCode: '',
        statusId: '',
        searchString: '',
        page: 0,
        size: CONFIG.PAGE_SIZE,
        sort: 'code,desc'
      },
      showCreateModal: false,
      listOrder: {},
    }
  }

  componentDidMount() {
    if (this.props.listStore.length === 0)
      this.props.fetchAllStore();
    orderStatusService.findAllOrderStatus().then(({ data }) => {
      this.setState({
        listOrderStatus: data,
      });
      Helper.setLoading(false);
    }).catch(error => {
      Helper.setLoading(false);
    });
    if (this.props.listConfigGlobal.length === 0) {
      this.props.fetchAllConfigGlobal();
    }
    this.onFilter();
  }

  componentWillReceiveProps({ location }) {
    const queryParam = queryString.parse(location.search);
    if (location.search !== '') {
      this.setState({
        params: {
          startDate: queryParam.startDate ? queryParam.startDate : '',
          endDate: queryParam.endDate ? queryParam.endDate : '',
          shipping: queryParam.shipping ? queryParam.shipping : '',
          storeCode: queryParam.storeCode ? queryParam.storeCode : '',
          statusId: queryParam.statusId ? queryParam.statusId : '',
          searchString: queryParam.searchString ? queryParam.searchString : '',
          page: queryParam.page ? queryParam.page : 0,
          size: queryParam.size ? queryParam.size : CONFIG.PAGE_SIZE,
          sort: queryParam.sort ? queryParam.sort : 'code,desc'
        },
      }, () => {
        this.onFilter();
      })
    }
  }

  onReceivedSelectValue = (event) => {
    this.setState({
      params: Object.assign({}, this.state.params, { [event.name]: event.value })
    }, () => {
      if (event.name === 'searchString') {
        this.redirectOrder();
      }
    });
  }

  onFilter = () => {
    findListOrder(this.state.params).then(({ data }) => {
      this.setState({
        listOrder: data
      })
      Helper.setLoading(false);
    }).catch(error => {
      Helper.setLoading(false);
      console.log(error);
    });
  }

  onNewOrder = () => {
    this.setState({
      showCreateModal: true,
    })
  }

  onReceivedValue = (event) => {
    this.setState({
      [event.name]: event.value
    }, () => {
      if (event.name === 'showCreateModal') {
        this.onFilter();
      }
    });
  }

  showListOrder = () => {
    const { listOrder } = this.state;
    return (listOrder.content && listOrder.content.length > 0) ? listOrder.content.map((order, index) => {
      return (
        <SingleOrderManagement key={index} order={order} listOrderStatus={this.state.listOrderStatus} onEmittedValue={this.onFilter} />
      )
    }) : <SingleOrderManagement message={"Rất tiếc đã không có đơn hàng nào phù hợp."} />;
  }

  redirectOrder = () => {
    const { startDate, endDate, shipping, storeCode, statusId, searchString, page, size, sort } = this.state.params;
    const listSearch = [
      { name: 'startDate', value: startDate },
      { name: 'endDate', value: endDate },
      { name: 'shipping', value: shipping },
      { name: 'storeCode', value: storeCode },
      { name: 'statusId', value: statusId },
      { name: 'searchString', value: searchString },
      { name: 'page', value: page },
      { name: 'size', value: size },
      { name: 'sort', value: sort },
    ]
    this.props.history.push(RedirectQueryParams(MODEL_ROUTING.MANAGEMENT, listSearch));
  }
  first = () => {
    if (!this.state.listOrder.first) {
      this.setState({
        params: Object.assign({}, this.state.params, {
          page: 0,
        })
      }, () => {
        this.redirectOrder();
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
        this.redirectOrder();
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
        this.redirectOrder();
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
        this.redirectOrder();
      });
    }
  }

  showPagination = () => {
    const { totalPages } = this.state.listOrder;
    return (totalPages) ? (<p>
      Page {(totalPages === 0) ? 0 : this.state.listOrder.number + 1} of {totalPages}
    </p>) : (<p>Page 0 of 0</p>);
  }

  closeDoNotModal = () => {
    this.setState({
      showCreateModal: false,
    })
  }
  render() {
    return (
      <div className="container-fluid padding-top1 page-min-height">
        <div className="row main-row">
          <div className="col-md-3">
            <CustomSearchInput name="searchString" placeholder="Mã đơn/sđt..."
              value={this.state.searchString} maxLength={25} onEmittedValue={this.onReceivedSelectValue} />
          </div>
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-4 col-lg-2">
                <CustomSelect placeholder="Giao đi/đến lấy" name="shipping" value={this.state.params.shipping} required={false}
                  data={selectOption} onEmittedValue={this.onReceivedSelectValue} />
              </div>
              <div className="col-md-4 col-lg-2">
                <CustomSelect placeholder="Cửa hàng" name="storeCode" value={this.state.params.storeCode} required={false}
                  data={this.props.listStore} onEmittedValue={this.onReceivedSelectValue} />
              </div>
              <div className="col-md-4 col-lg-2">
                <CustomSelect placeholder="Trạng thái" name="statusId" value={this.state.params.statusId} required={false}
                  data={this.state.listOrderStatus} onEmittedValue={this.onReceivedSelectValue} />
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
              <div className="col-md-4 col-lg-2">
                <div className="float-right">
                  <button type="button" className="btn btn-outline-success" data-tip="Lọc đơn hàng" onClick={this.redirectOrder}><i className="fas fa-filter"></i></button>&nbsp;
                  <button type="button" className="btn btn-outline-primary" data-tip="Tạo mới" onClick={this.onNewOrder}><i className="fas fa-plus-circle"></i></button>
                </div>
              </div>
            </div>
          </div>

        </div>
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
        {this.state.showCreateModal ? <CreateOrder currentUser={currentUser} onEmittedCloseModal={this.onReceivedValue} onEmittedCloseDoNotModal={this.closeDoNotModal} /> : null}
        <ReactTooltip />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    listStore: state.storeReducer,
    listConfigGlobal: state.configGlobalReducer,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllStore: () => {
      dispatch(fetAllStore());
    },
    fetchAllConfigGlobal: () => {
      dispatch(fetAllConfigGlobal());
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderList);