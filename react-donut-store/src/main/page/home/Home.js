import React, { Component } from 'react';
import { connect } from 'react-redux';
import SingleItem from '../../component/single-item/SingleItem';
import './Home.css';
import { fetAllItem } from '../../../redux/action/item.constant';
import xoaDau from '../../../share/util/xoaDau';
import NotFound from '../../../error/NotFound';
import ModalSingleItem from '../../component/modal-single-item/ModalSingleItem';
import { CONFIG_NAME } from '../../../share/constant/configuration.constant';
import { LOCAL_STORAGE } from '../../../share/constant/local-storage.constant';
const queryString = require('query-string');

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      showedModal: false,
      showedItem: {},
    }
  }

  componentDidMount() {
    if (this.props.listItem.length === 0)
      this.props.fetchAllItem();
  }

  componentWillReceiveProps({ location }) {
    const queryParam = queryString.parse(location.search);
    if (queryParam.name) {
      this.setState({
        searchString: queryParam.name
      });
    } else {
      this.setState({
        searchString: ''
      });
    }
  }

  searchItem() {
    let { listItem } = this.props;
    let result = null;
    const { searchString } = this.state;
    if (listItem.length > 0) {
      if (searchString !== '') {
        listItem = listItem.filter(i => xoaDau(i.name.toLowerCase()).includes(xoaDau(searchString.toLowerCase())));
      }
      result = this.showItem(listItem);
    }
    return result ? result : (
      (searchString === '') ? '' : <NotFound title="Không có sản phẩm nào phù hợp" />
    );
  }

  showItem = (listItem) => {
    return (listItem.length > 0) ? listItem.map((item, index) => {
      return (
        <SingleItem key={index} item={item} quickLook={true} onEmittedShowModal={this.onReceivedActionModal} />
      );
    }) : null;
  }

  onReceivedActionModal = (event) => {
    this.setState({
      showedModal: event.showed,
      showedItem: event.item ? event.item : {},
    })
  }

  showPrivacy = () => {
    const privacy = JSON.parse(localStorage.getItem(LOCAL_STORAGE.CONFIG_GLOBAL)) ? JSON.parse(localStorage.getItem(LOCAL_STORAGE.CONFIG_GLOBAL)).find(i => i.name === CONFIG_NAME.PRIVACY).value : '';
    return (privacy && privacy !== '') ? privacy.split('/').map((p, index) => {
      return <li key={index}>{p}</li>
    }) : null;
  }
  render() {
    const shippingPrice = JSON.parse(localStorage.getItem(LOCAL_STORAGE.CONFIG_GLOBAL)) ? JSON.parse(localStorage.getItem(LOCAL_STORAGE.CONFIG_GLOBAL)).find(i => i.name === CONFIG_NAME.SHIPPING_PRICE).value : '';
    return (
      <div className="container" style={{ minHeight: '45vh' }}>
        <div className="row">
          <div className="col-md-5">
            <ul style={{ paddingTop: '1em', fontFamily: 'Open-sans', fontSize: '1rem', listStyleType: 'circle', color: 'red' }}>
              {this.showPrivacy()}
            </ul>
          </div>
          <div className="col-md-7">
            {/* <div className="shipping-price" style={{ backgroundImage: `url(https://res.cloudinary.com/hitkeodog/image/upload/v1533796074/donut-store/shipping-price.png)` }}></div> */}
            {/* <img src="https://res.cloudinary.com/hitkeodog/image/upload/v1533796074/donut-store/shipping-price.png" alt="" width={'100%'}/> */}
            <img src={shippingPrice} alt="" width={'100%'} />
          </div>
        </div>
        <div className="row text-center">
          {this.searchItem()}
        </div>
        {this.state.showedModal ? <ModalSingleItem showed={this.state.showedModal} item={this.state.showedItem} onEmittedCloseModal={this.onReceivedActionModal} /> : ''}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    listItem: state.itemReducer,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllItem: () => {
      dispatch(fetAllItem());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);