import React, { Component } from 'react';
import { connect } from 'react-redux';
import SingleItem from '../../component/single-item/SingleItem';
import './Home.css';
import GGMaps from '../../component/gg-maps/GGMaps';
import { fetAllCategory } from '../../../redux/action/category.constant';
import { fetAllStore } from '../../../redux/action/store.constant';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      findBy: "",
    }
    this.showCategory = this.showCategory.bind(this);
    this.showGGmaps = this.showGGmaps.bind(this);
  }

  componentDidMount() {
    if (this.props.listCategory.length === 0)
      this.props.fetchAllCategory();
    if (this.props.listStore.length === 0)
      this.props.fetchAllStore();
  }

  showCategory() {
    let result = null;
    if (this.props.listCategory.length > 0) {
      result = this.props.listCategory.map((category, index) => {
        return (

          <div key={index} className="row ds-card-margin" >
            {this.showItem(category.items)}
          </div>
        );
      });
    }
    return result;
  }

  showItem(items) {
    let result = null;
    if (items.length > 0) {
      result = items.map((item, index) => {
        return (
          <SingleItem key={index} item={item} />
        );
      });
    }
    return result;
  }

  showGGmaps() {
    if (this.props.listStore.length > 0)
      return <GGMaps listStore={this.props.listStore} defaultZoom={12} />
  }

  render() {
    return (
        <div className="container">
          {/* <div className="row ds-second-div">
            <div className="col-12">
              <div className="more-detail gg-maps"></div>
            </div>
          </div> */}
          {this.showCategory()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    listCategory: state.categoryReducer,
    listStore: state.storeReducer,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllCategory: () => {
      dispatch(fetAllCategory());
    },
    fetchAllStore: () => {
      dispatch(fetAllStore());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);