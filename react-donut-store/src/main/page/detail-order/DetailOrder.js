import React, { Component } from 'react';
import queryString from 'query-string';
import './DetailOrder.css';
import RedirectQueryParams from '../../../share/util/RedirectQueryParams';
import { ROUTING_URL } from '../../../share/constant/routing.constant';
import ReCAPTCHA from "react-google-recaptcha";
import { capchaKey } from '../../../enviroment';
import * as Helper from '../../../share/common/helper/Helper';
import { findTodayListOrder } from '../../util/api-caller';
import SingleOrder from '../../component/single-order/SingleOrder';

const recaptchaRef = React.createRef();

class DetailOrder extends Component {

  constructor(props) {
    super(props);
    this.state = {
      orderCode: '',
      searchString: '',
      listOrder: [],
      isSubmitting: false,
    }
  }
  componentWillReceiveProps({ location }) {
    const queryParam = queryString.parse(location.search);
    console.log(queryParam);
    this.setState({
      orderCode: queryParam.orderCode,
      listOrder: [],
      isSubmitting: true,
      searchString: queryParam.orderCode,
    });
    window.grecaptcha.execute();
  }
  onCaptchaCompleted = e => {
    findTodayListOrder(this.state.orderCode, e).then(({ data }) => {
      Helper.setLoading(false);
      this.setState({
        isSubmitting: false,
        listOrder: data
      });
      console.log(data);
    }).catch(e => {
      console.log(e);
      Helper.setLoading(false);
      this.setState({
        isSubmitting: false,
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
    this.props.history.push(RedirectQueryParams(ROUTING_URL.DETAIL_ORDER, [{ name: 'orderCode', value: this.state.searchString }]))
  }

  showListOrder = () => {
    const { listOrder } = this.state;
    return (listOrder.length > 0) ? listOrder.map((order, index) => {
      return (
        <SingleOrder key={index} order={order}/>
      )
    }) : null;
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
                <button type="button" disabled={this.state.isSubmitting} className="btn search-btn submit-btn" onClick={this.onSearch}>
                  <span><i className="fas fa-search"></i> Tìm kiếm</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        {this.showListOrder()}
      </div>
    );
  }
}

export default DetailOrder;