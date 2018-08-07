import React, { Component } from 'react';
import { findAllCategory, findAllStore } from '../util/api-caller';
import { connect } from 'react-redux';
import SingleItem from '../../component/single-item/SingleItem';
import './Home.css';
import GGMaps from '../../component/gg-maps/GGMaps';
import { actFetchCategory } from '../../../redux/action/category.constant';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      listCategory: [],
      listStore: [],
    }
    this.showCategory = this.showCategory.bind(this);
  }

  componentDidMount() {
    findAllCategory().then(({ data }) => {
      // this.setState({
      //   listCategory: data,
      // });
      this.props.fetchAllCategory(data);
    }).catch((error) => {
      console.log(error);
    });

    findAllStore().then(({ data }) => {
      this.setState({
        listStore: data,
      });
    }).catch((error) => {
      console.log(error);
    });
    console.log("componentDidMount");
    console.log(this.state);
  }

  showCategory() {
    let result = null;
    if (this.state.listCategory.length > 0) {
      result = this.state.listCategory.map((category, index) => {
        return (
          <div key={index} className="card ds-card-margin">
            <h5 className="card-header"><b>{category.name}</b></h5>
            <div className="card-body">
              <div className="row">
                {this.showItem(category.items)}
              </div>
            </div>
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

  render() {
    console.log(this.state);
    return (
      <div className="ds-main">
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to={0} className="active" />
            <li data-target="#carouselExampleIndicators" data-slide-to={1} />
            <li data-target="#carouselExampleIndicators" data-slide-to={2} />
            <li data-target="#carouselExampleIndicators" data-slide-to={3} />
            <li data-target="#carouselExampleIndicators" data-slide-to={4} />
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img className="d-block w-100" src={require('../../../assets/img/donut-store/BR1.jpg')} alt="First slide" />
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src={require("../../../assets/img/donut-store/BR2.jpg")} alt="Second slide" />
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src={require("../../..//assets/img/donut-store/BR3.jpg")} alt="Third slide" />
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src={require("../../..//assets/img/donut-store/BR4.jpg")} alt="Fourth slide" />
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src={require("../../..//assets/img/donut-store/BR5.jpg")} alt="Fifth slide" />
            </div>
          </div>
          <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="sr-only">Next</span>
          </a>
        </div>

        <div className="container-fluid" style={{marginTop: '1em'}}>
        <div className="col-12 col-sm-11 ds-second-div" style={{background: 'white'}}>
          <div className="col-md-7">

          </div>
          <div className="col-sm-5">
            <GGMaps listStore={this.state.listStore}/>
          </div>
        </div>
      </div>

        <div className="container">
          {this.showCategory()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listCategory: state.categoryReducer,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllCategory: (listCategory) => {
      dispatch(actFetchCategory(listCategory));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);