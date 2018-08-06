import React, { Component } from 'react';
import HeaderMain from '../../layout-main/header-main/HeaderMain';
import FooterMain from '../../layout-main/footer-main/FooterMain';
import { findAllCategory, findAllStore } from '../util/api-caller';
import { connect } from 'react-redux';
import SingleItem from '../../component/single-item/SingleItem';
import './Home.css';

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
      this.setState({
        listCategory: data,
      });
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
  }

  showCategory() {
    let result = null;
    if (this.state.listCategory.length > 0) {
      result = this.state.listCategory.map((category, index) => {
        return (
          <div key={index} className="card ds-card-margin">
            <h5 className="card-header">{category.name}</h5>
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
    return (
      <div className="ds-main">
        <HeaderMain />
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


        <div className="container">
          {this.showCategory()}
        </div>
        <FooterMain />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listItem: state.itemReducer,
  }
}
export default connect(mapStateToProps, null)(Home);