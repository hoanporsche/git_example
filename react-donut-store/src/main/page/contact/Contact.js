import React, { Component } from 'react';
import SectionHeading from '../../component/section-heading/SectionHeading';
import './Contact.css';
import { connect } from 'react-redux';
import { fetAllStore } from '../../../redux/action/store.constant';
import GGMaps from '../../component/gg-maps/GGMaps';

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
    if (this.props.listStore.length > 0)
      return <GGMaps listStore={this.props.listStore} defaultZoom={12} />
  }

  showListStore() {
    let result = null;
    if (this.props.listStore.length > 0) {
      result = this.props.listStore.map((store, index) => {
        return (
          <li key={index}>
            Cơ sở {index + 1}: {store.address} - Sđt: {store.phone}
          </li>
        )
      })
    }
    return result;
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
              <li>Giao hàng với đơn hàng từ 90k</li>
              <li>Freeship 3km đầu tiên</li>
              <li>Có hóa đơn</li>
            </ul>
            <h5><b>Hotline phản hồi:</b></h5>
            <h4 style={{ color: 'red' }}><i className="fas fa-mobile-alt"></i><b> 094 345 1794</b></h4>
          </div>
        </div>
        <hr />
        <SectionHeading title="Hòm thư góp ý" />
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