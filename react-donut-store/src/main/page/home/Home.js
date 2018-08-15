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
      <div>
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
              <img className="d-block w-100" src={"https://res.cloudinary.com/hitkeodog/image/upload/v1533569767/donut-store/banh-ran/BR1.jpg"} alt="First slide" />
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src={"https://res.cloudinary.com/hitkeodog/image/upload/v1533569793/donut-store/banh-ran/BR2.jpg"} alt="Second slide" />
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src={"https://res.cloudinary.com/hitkeodog/image/upload/v1533569771/donut-store/banh-ran/BR3.jpg"} alt="Third slide" />
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src={"https://res.cloudinary.com/hitkeodog/image/upload/v1533569776/donut-store/banh-ran/BR4.jpg"} alt="Fourth slide" />
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src={"https://res.cloudinary.com/hitkeodog/image/upload/v1533569782/donut-store/banh-ran/BR5.jpg"} alt="Fifth slide" />
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

        <div className="container-fluid" style={{ marginTop: '1em' }}>
          <div className="col-12 col-sm-11 ds-second-div" style={{ background: 'white' }}>
            <div className="row">
              <div className="col-sm-5">
                { this.showGGmaps() }
              </div>
              <div className="col-sm-7">
                <div className="more-detail gg-maps"></div>
              </div>
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