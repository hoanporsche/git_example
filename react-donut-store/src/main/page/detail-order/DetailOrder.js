import React, { Component } from 'react';
import './DetailOrder.css';
import RedirectQueryParams from '../../../share/util/RedirectQueryParams';
import { ROUTING_URL } from '../../../share/constant/routing.constant';
import ReCAPTCHA from "react-google-recaptcha";
import { capchaKey } from '../../../enviroment';
import * as Helper from '../../../share/common/helper/Helper';
import { findTodayListOrder } from '../../util/api-caller';
import SingleOrder from '../../component/single-order/SingleOrder';
const queryString = require('query-string');

const recaptchaRef = React.createRef();

class DetailOrder extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      listOrder: [],
      isSubmitting: false,
      isSearching: false,
      isNew: false,
    }
  }
  componentDidMount() {
    const queryParam = queryString.parse(this.props.location.search);
    if (queryParam.orderCode) {
      this.setState({
        searchString: queryParam.orderCode,
        isSearching: false,
      });
    }
    if (queryParam.new) {
      this.setState({
        isNew: true,
      });
    }
  }

  componentWillReceiveProps({ location }) {
    const queryParam = queryString.parse(location.search);
    window.grecaptcha.reset();
    if (queryParam.orderCode) {
      this.setState({
        isSubmitting: true,
        searchString: queryParam.orderCode,
      });
      window.grecaptcha.execute();
    } else {
      this.setState({
        listOrder: [],
        isSearching: false,
        isNew: false,
      });
    }
    if (queryParam.new) {
      this.setState({
        isNew: true,
      });
    }
    console.log("123");
  }

  onCaptchaCompleted = e => {
    findTodayListOrder(this.state.searchString, e).then(({ data }) => {
      Helper.setLoading(false);
      this.setState({
        isSubmitting: false,
        listOrder: data,
        isSearching: true,
      });
    }).catch(e => {
      Helper.setLoading(false);
      this.setState({
        isSubmitting: false,
        isSearching: true,
        listOrder: [],
      })
    })
  }

  onChange = (event) => {
    const target = event.target;
    this.setState({
      searchString: target.value.trim(),
    })
  }

  onSearch = () => {
    Helper.setLoading(true);
    if (!this.state.isSubmitting) {
      this.props.history.push(RedirectQueryParams(ROUTING_URL.DETAIL_ORDER, [{ name: 'orderCode', value: this.state.searchString }]))
    }
  }

  showListOrder = () => {
    const { listOrder } = this.state;
    return (listOrder.length > 0) ? listOrder.map((order, index) => {
      return (
        <SingleOrder key={index} order={order} />
      )
    }) : <SingleOrder message={this.state.isSearching ? "Rất tiếc đã không có đơn hàng nào phù hợp." : "Xin hãy nhập mã đơn hàng hoặc số điện thoại của bạn và ấn kiểm tra."} />;
  }

  showIsNew = () => {
    return this.state.isNew ? (
      <ul className="text-center">Cảm ơn bạn đã tin tưởng Bánh Rán Hoàn.
        <li>Đơn hàng {this.state.searchString} của bạn đã được tạo thành công.</li>
        <li>Để theo dõi đơn hàng, bạn hãy nhập mã đơn hàng hoặc số điện thoại vào ô tìm kiếm ở trên và kiểm tra.</li>
      </ul>
    ) : null;
  }
  render() {
    return (
      <div id="detail-order" className="container"><ReCAPTCHA
        ref={recaptchaRef}
        size="invisible"
        sitekey={capchaKey}
        onChange={this.onCaptchaCompleted}
      />
        <h3 className="text-center"><i className="fas fa-book"></i> Theo dõi đơn hàng</h3>
        <div className="row">
          <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
            <div className="row">
              <div className="col-8 col-md-9">
                <input type="text" maxLength={25} className="form-control custom-input" onChange={this.onChange} value={this.state.searchString} placeholder="Nhập mã đơn hàng hoặc số điện thoại của bạn..." />
              </div>
              <div className="col-4 col-md-3">
                <button type="button" disabled={this.state.isSubmitting || this.state.searchString === ''} className="btn search-btn submit-btn" onClick={this.onSearch}>
                  <span><i className="fas fa-search"></i> Kiểm tra</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        {this.showIsNew()}
        {this.showListOrder()}
      </div>
    );
  }
}

export default DetailOrder;