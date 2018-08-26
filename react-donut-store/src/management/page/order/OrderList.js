import React, { Component } from 'react';
import './OrderList.css';
import { connect } from 'react-redux';
import { CONFIG } from '../../../share/constant/configuration.constant';
import { fetAllStore } from '../../../redux/action/store.constant';
import * as orderStatusService from '../config/model/order-status/OrderStatus.ApiCaller';
import * as Helper from '../../../share/common/helper/Helper';
import CustomSelect from '../../../share/common/custom-select/CustomSelect';
import CustomDate from '../../../share/common/custom-datetime/CustomDate';
import CustomSearchInput from '../../../share/common/custom-search-input/CustomSearchInput';
import { fetListOrder } from '../../../redux/action/order.constant';
import SingleOrderManagement from '../../component/single-order-management/SingleOrderManagement';
import CreateOrder from './component/create-order/CreateOrder';
import { LOCAL_STORAGE } from '../../../share/constant/local-storage.constant';

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
    }
  }

  async componentDidMount() {
    if (this.props.listStore.length === 0)
      await this.props.fetchAllStore();
    await orderStatusService.fetchAll().then(({ data }) => {
      this.setState({
        listOrderStatus: data,
      });
      Helper.setLoading(false);
    }).catch(error => {
      Helper.setLoading(false);
    });
    await this.props.fetchListOrder(this.state.params);
  }

  onReceivedSelectValue = (event) => {
    this.setState({
      params: Object.assign({}, this.state.params, { [event.name]: event.value })
    }, () => {
      if (event.name === 'searchString') {
        this.onFilter();
      }
    });
  }

  onFilter = () => {
    this.props.fetchListOrder(this.state.params);
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
    const { listOrder } = this.props;
    return (listOrder.content && listOrder.content.length > 0) ? listOrder.content.map((order, index) => {
      return (
        <SingleOrderManagement key={index} order={order} listOrderStatus={this.state.listOrderStatus} onEmittedValue={this.onFilter}/>
      )
    }) : <SingleOrderManagement message={"Rất tiếc đã không có đơn hàng nào phù hợp."} />;
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
    const { totalPages } = this.props.listOrder;
    return (totalPages) ? (<p>
      Page {(totalPages === 0) ? 0 : this.props.listOrder.number + 1} of {totalPages}
    </p>) : (<p>Page 0 of 0</p>);
  }
  
  render() {
    return (
      <div className="container-fluid padding-top1">
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
                  <CustomDate name="startDate" placeholder="Từ ngày" onEmittedValue={this.onReceivedSelectValue} />
                </div>
              </div>
              <div className="col-md-4 col-lg-2">
                <div className="form-group">
                  <CustomDate name="endDate" placeholder="đến ngày" onEmittedValue={this.onReceivedSelectValue} />
                </div>
              </div>
              <div className="col-md-4 col-lg-2">
                <div className="float-right">
                  <button type="button" className="btn btn-outline-success" onClick={this.onFilter}><i className="fas fa-filter"></i></button>&nbsp;
                  <button type="button" className="btn btn-outline-primary" onClick={this.onNewOrder}><i className="fas fa-plus-circle"></i></button>
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
        {this.state.showCreateModal ? <CreateOrder currentUser={currentUser} onEmittedCloseModal={this.onReceivedValue}/> : null}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    listOrder: state.orderReducer,
    listStore: state.storeReducer,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllStore: () => {
      dispatch(fetAllStore());
    },
    fetchListOrder: (params) => {
      dispatch(fetListOrder(params));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderList);