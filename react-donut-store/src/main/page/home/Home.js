import React, { Component } from 'react';
import { connect } from 'react-redux';
import SingleItem from '../../component/single-item/SingleItem';
import './Home.css';
import { fetAllItem } from '../../../redux/action/item.constant';
import queryString from 'query-string';
import xoaDau from '../../../share/util/xoaDau';
import NotFound from '../../../error/NotFound';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
    }
  }

  componentDidMount() {
    if (this.props.listItem.length === 0)
      this.props.fetchAllItem();
  }

  componentWillReceiveProps({ location }) {
    const queryParam = queryString.parse(location.search);
    if (queryParam.name !== undefined) {
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
    if (listItem.length > 0) {
      if (this.state.searchString !== '') {
        listItem = listItem.filter(i => xoaDau(i.name.toLowerCase()).includes(xoaDau(this.state.searchString.toLowerCase())));
      }
      result = this.showItem(listItem);
    }
    return (result === null) ? <NotFound title="Không có sản phẩm nào phù hợp" />: result;
  }

  showItem = (listItem) => {
    let result = null;
    if (listItem.length > 0) {
      result = listItem.map((item, index) => {
        return (
          <SingleItem key={index} item={item} />
        );
      });
    }
    return result;
  }

  render() {
    return (
      <div className="container">
        {/* <div className="row ds-second-div">
            <div className="col-12">
              <div className="more-detail gg-maps"></div>
            </div>
          </div> */}
        <div className="row text-center">
          {this.searchItem()}
        </div>
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