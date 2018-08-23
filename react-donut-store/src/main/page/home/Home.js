import React, { Component } from 'react';
import { connect } from 'react-redux';
import SingleItem from '../../component/single-item/SingleItem';
import './Home.css';
import { fetAllItem } from '../../../redux/action/item.constant';
import queryString from 'query-string';
import xoaDau from '../../../share/util/xoaDau';
import NotFound from '../../../error/NotFound';
import ModalSingleItem from '../../component/modal-single-item/ModalSingleItem';

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

  render() {
    return (
      <div className="container" style={{minHeight: '45vh'}}>
        {/* <div className="row ds-second-div">
            <div className="col-12">
              <div className="more-detail gg-maps"></div>
            </div>
          </div> */}
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