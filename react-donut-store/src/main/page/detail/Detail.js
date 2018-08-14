import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetAllItem } from '../../../redux/action/item.constant';
import { fetAllCategory } from '../../../redux/action/category.constant';
import SectionHeading from '../../component/section-heading/SectionHeading';
import './Detail.css';
import { actAddQuantity } from '../../../redux/action/order.constant';
import SingleItem from '../../component/single-item/SingleItem';
import SingleCategory from '../../component/single-category/SingleCategory';

class Detail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      code: this.props.match.params.code,
      quantity: 0,
      inValid: true,
      message: '',
      categoryCode: 'CATltmdtvb',
    }
  }

  componentDidMount() {
    if (this.props.listItem.length === 0) {
      this.props.fetchAllItem();
    }
    if (this.props.listCategory.length === 0) {
      this.props.fetchAllCategory();
    }
  }

  onChange = (event) => {
    const value = +event.target.value;
    if (value > 0 && value < 300) {
      this.setState({
        inValid: false,
        quantity: value
      });
    } else {
      this.setState({
        inValid: true,
        quantity: value
      })
    }
  }

  onClick = () => {
    if (0 < this.state.quantity < 300) {
      const item = this.props.listItem.find(i => i.code === this.state.code);
      this.props.addOneQuantity({
        item: item,
        quantity: this.state.quantity,
      });
      this.setState({
        message: "Thêm vào giỏ hàng thành công",
      });
    } else {
      alert("Vui lòng chọn số lượng");
    }
  }

  onDismissMessage = () => {
    this.setState({
      message: "",
    })
  }

  showItem = () => {
    const item = this.props.listItem.find(i => i.code === this.state.code);
    if (item !== undefined) {
      return (
        <div className="container contain-main">
          <SectionHeading title={item.name} />
          <div className="row">
            <div className="col-sm-1">
              123
            </div>
            <div className="col-sm-4">
              <div className="item-picture" style={{ backgroundImage: `url(${item.picture})` }}></div>
            </div>
            <div className="col-sm-7 padding-item">
              <div className="detail-item">
                <span>{item.singleValue} đ</span>
                <p>{item.description}</p>
                <div className="row" style={{ marginLeft: '0px' }}>
                  <div className="col-3">
                    <input type="number" name="quantity" className="form-control" value={this.state.quantity} onChange={this.onChange} />
                  </div>
                  <div className="col-3">
                    <button className="btn btn-success" onClick={this.onClick} disabled={this.state.inValid}>Mua ngay</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  onReceivedCategoryCode = (emittedValue) => {
    this.setState({
      categoryCode: emittedValue.categoryCode,
    });
  }

  showAllCategory = () => {
    const { listCategory } = this.props;
    let result = null;
    if (listCategory.length > 0) {
      result = listCategory.map((category, index) => {
        let active = false;
        if (this.state.categoryCode === category.code)
          active = true;
        return (
          <SingleCategory key={index} category={category} active={active} emittedCategoryCode={this.onReceivedCategoryCode} />
        )

      })
    }
    return result;
  }

  showOtherItemByCategory = () => {
    const { listCategory } = this.props;
    let result = null;
    if (listCategory.length > 0) {
      const foundCategory = listCategory.find(i => i.code === this.state.categoryCode);
      if (foundCategory !== undefined) {
        const items = foundCategory.items.filter(i => i.code !== this.state.code);
        result = items.map((item, index) => {
          return (
            <SingleItem key={index} item={item} />
          )
        })
      }
    }
    return result;
  }

  showMessage = () => {
    if (this.state.message !== '') {
      return (
        <div className="alert alert-warning">
          <button type="button" className="close" onClick={this.onDismissMessage}>×</button>
          <strong>{this.state.message}</strong>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="wrapper">
        <div className="container-fluid contain">
          {this.showMessage()}
          {this.showItem()}
        </div>
        {/* <div className="container-fluid contain-fluid-menu">
          <div className="container contain-menu" >
            <SectionHeading title="Thực đơn khác" />
            <ul className="row main-menu-category">
              {this.showAllCategory()}
            </ul>
          </div>
          
        </div> */}
        <div className="container-fluid other-item">
          <div className="container contain-menu" >
            <SectionHeading title="Thực đơn khác" />
            <ul className="row main-menu-category">
              {this.showAllCategory()}
            </ul>
            <hr/>
            <div className="row" style={{ marginTop: '1%'}}>
              {this.showOtherItemByCategory()}
            </div>
          </div>
          {/* <div className="container">
            <div className="row" style={{ marginTop: '1%'}}>
              {this.showOtherItemByCategory()}
            </div>
          </div> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listItem: state.itemReducer,
    listCategory: state.categoryReducer,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllItem: () => {
      dispatch(fetAllItem());
    },
    fetchAllCategory: () => {
      dispatch(fetAllCategory());
    },
    addOneQuantity: (quantity) => {
      dispatch(actAddQuantity(quantity));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Detail);