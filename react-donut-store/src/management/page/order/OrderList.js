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
      }
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
      console.log(error);
      Helper.setLoading(false);
    });
    await this.props.fetchListOrder(this.state.params);
  }

  onReceivedSelectValue = (event) => {
    this.setState({
      params: Object.assign({}, this.state.params, { [event.name]: event.value })
    }, () => {
      console.log(this.state);
    });
  }

  onFilter = () => {
    this.props.fetchListOrder(this.state.params);
  }

  render() {
    return (
      <div className="container-fluid padding-top1">
        <div className="row">
          <div className="col-md-3">
            <CustomSearchInput name="searchString" placeholder="Mã đơn/sđt..."
              value={this.state.searchString} maxLength={25} onEmittedValue={this.onReceivedSelectValue} />
          </div>
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-2">
                <CustomSelect placeholder="Giao đi/đến lấy" name="shipping" value={this.state.params.shipping}
                  data={selectOption} onEmittedValue={this.onReceivedSelectValue} />
              </div>
              <div className="col-md-2">
                <CustomSelect placeholder="Cửa hàng" name="storeCode" value={this.state.params.storeCode}
                  data={this.props.listStore} onEmittedValue={this.onReceivedSelectValue} />
              </div>
              <div className="col-md-2">
                <CustomSelect placeholder="Trạng thái" name="statusId" value={this.state.params.statusId}
                  data={this.state.listOrderStatus} onEmittedValue={this.onReceivedSelectValue} />
              </div>
              <div className="col-md-2">
                <div className="form-group">
                  <CustomDate name="startDate" placeholder="Từ ngày" onEmittedValue={this.onReceivedSelectValue} />
                </div>
              </div>
              <div className="col-md-2">
                <div className="form-group">
                  <CustomDate name="endDate" placeholder="đến ngày" onEmittedValue={this.onReceivedSelectValue} />
                </div>
              </div>
              <div className="col-md-2">
                <div className="float-right">
                  <button className="btn btn-success" onClick={this.onFilter}>Lọc đơn hàng</button>
                </div>
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