import React, { Component } from 'react';
import SectionHeader from '../../component/section-header/SectionHeader';
import './Contact.css';
import { connect } from 'react-redux';
import { fetAllStore } from '../../../redux/action/store.constant';
import GGMaps from '../../component/gg-maps/GGMaps';
import { CONFIG_NAME } from '../../../share/constant/configuration.constant';
import NumberFormat from 'react-number-format';

class Contact extends Component {

  constructor(props) {
    super(props);
    this.showGGmaps = this.showGGmaps.bind(this);
    this.showListStore = this.showListStore.bind(this);
  }

  componentDidMount() {
    let { listStore } = this.props;
    if (listStore.length === 0)
      this.props.fetchAllStore();
  }

  showGGmaps() {
    return (this.props.listStore.length > 0) ?
      <GGMaps listStore={this.props.listStore} defaultZoom={12} /> : null;
  }

  showListStore() {
    return (this.props.listStore.length > 0) ? this.props.listStore.map((store, index) => {
      return (
        <li key={index}>
          Cơ sở {index + 1}: {store.address} - Sđt: {store.phone}
        </li>
      )
    }) : null;
  }

  findHotLine = () => {
    const { listConfigGlobal } = this.props;
    const value = listConfigGlobal.find(i => i.name === CONFIG_NAME.HOT_LINE);
    return value ? value.value : '';
  }

  findFreeShipDistance = () => {
    const { listConfigGlobal } = this.props;
    const value = listConfigGlobal.find(i => i.name === CONFIG_NAME.FREE_SHIP_DISTANCE);
    return value ? +value.value : 0;
  }

  findMinTotalPrice = () => {
    const { listConfigGlobal } = this.props;
    const value = listConfigGlobal.find(i => i.name === CONFIG_NAME.MIN_TOTAL_PRICE);
    return value ? +value.value : 0;
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6 ggmap-css">
            {this.showGGmaps()}
          </div>
          <div className="col-sm-6">
            <h5><b>Địa chỉ:</b></h5>
            <ul>
              {this.showListStore()}
            </ul>
            <h5><b>Thời gian mở cửa:</b></h5>
            <ul>
              <li>Thứ 2 - Chủ nhật : 7:00 - 19:30</li>
            </ul>
            <h5><b>Dịch vụ giao hàng:</b></h5>
            <ul>
              <li>Giao hàng với đơn hàng từ <NumberFormat value={this.findMinTotalPrice()} displayType={'text'} thousandSeparator={true} />₫</li>
              <li>Freeship {this.findFreeShipDistance()}km đầu tiên</li>
              <li>Có hóa đơn</li>
            </ul>
            <h5><b>Hotline phản hồi:</b></h5>
            <h4 style={{ color: 'red' }}><i className="fas fa-mobile-alt"></i><b> {this.findHotLine()}</b></h4>
          </div>
        </div>
        <hr />
        <SectionHeader title="Hòm thư góp ý" />
        <form className="row">
          <div className="col-sm-6">
            <div className="form-group">
              <input type="text" className="form-control" placeholder="*Tên của bạn" />
            </div>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="*Số điện thoại của bạn" />
            </div>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="*Email của bạn" />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <input type="text" className="form-control" placeholder="*Tiêu đề" />
            </div>
            <div className="form-group">
              <textarea rows="4" className="form-control" style={{ maxHeight: '93px' }} placeholder="*Nội dung"></textarea>
            </div>
          </div>
          <div className="col-12">
            <div className="bottom-button">
              <button type="button" className="btn btn-primary" style={{ textAlign: 'center' }}>Gửi góp ý</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listStore: state.storeReducer,
    listConfigGlobal: state.configGlobalReducer,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllStore: () => {
      dispatch(fetAllStore());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact);