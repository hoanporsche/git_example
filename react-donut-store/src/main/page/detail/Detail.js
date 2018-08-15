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
      code: 'ITEkrfpyhe',
      quantity: 0,
      inValid: true,
      message: '',
      categoryCode: 'CATltmdtvb',
      picture: '',
    }
  }

  componentDidMount() {
    if (this.props.match !== undefined) {
      this.setState({
        code: this.props.match.params.code,
      })
    }
    if (this.props.listItem.length === 0) {
      this.props.fetchAllItem();
    }
    if (this.props.listCategory.length === 0) {
      this.props.fetchAllCategory();
    }
  }

  componentWillReceiveProps({ match }) {
    if (match !== undefined) {
      this.setState({
        code: match.params.code,
        quantity: 0,
        inValid: true,
        message: '',
        picture: '',
      });
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
      });
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
        );
      });
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
        });
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

  showItem = () => {
    const item = this.props.listItem.find(i => i.code === this.state.code);
    if (item !== undefined) {
      return (
        <div id="page-detail" className="container">
          <div className="text-center">
            <h1>{item.name}</h1>
          </div>
          <div className="row">
            <div className="col-md-2 col-4">
              <div className="row">
                {this.showMiniItemPicture(item.picture)}
              </div>
            </div>
            <div className="col-md-5 col-8">
              {this.showMainPicture(item.picture)}
            </div>
            <div className="col-md-5 col-12 padding-item">
              <div className="detail-item">
                <span>{item.singleValue} đ</span>
                <p>{item.description}</p>
                <div className="row" style={{ marginLeft: '0px' }}>
                  <div className="col-3">
                    <input type="number" name="quantity" className="form-control" value={this.state.quantity} onChange={this.onChange} />
                  </div>
                  <div className="col-3">
                    <button className="btn btn-success" onClick={this.onClick} disabled={this.state.inValid}>Mua hàng</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  showMiniItemPicture(pictures) {
    let result = null;
    if (pictures.length > 0) {
      result = pictures.map((picture, index) => {
        let classBorder = '';
        if ((this.state.picture === '' && index === 0) || this.state.picture === picture)
          classBorder = 'border-picture';
        return (
          <div className="col-12" key={index}>
            <div className={`single-item-image ${classBorder}`} style={{ backgroundImage: `url(${picture})` }} onClick={(e) => this.onChangePicture(picture, e)} />
          </div>
        )
      })
    }
    return result;
  }

  onChangePicture = (picture) => {
    this.setState({
      picture: picture,
    })
  }

  //Show default picture if aside mini picture has not been choose, we will take a first element of picture's array
  showMainPicture(pictures) {
    let picture = pictures[0];
    if (this.state.picture !== '') {
      picture = this.state.picture;
    }
    return (
      <div className="item-picture" style={{ backgroundImage: `url(${picture})` }}></div>
    )
  }

  render() {
    return (
      <div>
        <div className="container-fluid">
          {this.showMessage()}
          {this.showItem()}
          <div className="container contain-detail" style={{ textAlign: 'center' }} >
            <SectionHeading title="Thực đơn khác" />
            <ul className="row main-menu-category">
              {this.showAllCategory()}
            </ul>
            <hr />
            <div className="row" style={{ marginTop: '-20px' }}>
              {this.showOtherItemByCategory()}
            </div>
          </div>
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