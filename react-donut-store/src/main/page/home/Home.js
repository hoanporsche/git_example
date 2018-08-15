import React, { Component } from 'react';
import { connect } from 'react-redux';
import SingleItem from '../../component/single-item/SingleItem';
import './Home.css';
import { fetAllItem } from '../../../redux/action/item.constant';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      findBy: "",
    }
  }

  componentDidMount() {
    if (this.props.listItem.length === 0)
      this.props.fetchAllItem();
  }

  showItem = () => {
    let result = null;
    if (this.props.listItem.length > 0) {
      result = this.props.listItem.map((item, index) => {
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
          {this.showItem()}
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