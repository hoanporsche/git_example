import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetAllItem } from '../../../redux/action/item.constant';
import { fetAllCategory } from '../../../redux/action/category.constant';
import SectionHeader from '../../component/section-header/SectionHeader';
import './Detail.css';
import { actAddQuantity } from '../../../redux/action/quantity.constant';
import { addNotification } from '../../../redux/action/notification.constant';
import SingleItem from '../../component/single-item/SingleItem';
import SingleCategory from '../../component/single-category/SingleCategory';
import NumberFormat from 'react-number-format';
import GoToCartNoti from '../../component/go-to-cart-noti/GoToCartNoti';
import ChooseQuantity from '../../component/choose-quantity/ChooseQuantity';

class Detail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      url: '',
      quantity: 1,
      categoryCode: '',
      picture: '',
    }
  }

  componentDidMount() {
    if (this.props.match !== undefined) {
      this.setState({
        url: this.props.match.params.url,
      })
    }
    if (this.props.listItem.length === 0) {
      this.props.fetchAllItem();
    }
    if (this.props.listCategory.length === 0) {
      this.props.fetchAllCategory();
    }
    this.setDefaultItem(this.props.listItem);
    this.setDefaultCategory(this.props.listCategory);
  }

  componentWillReceiveProps(newProps) {
    console.log(newProps);
    
    if (newProps.match) {
      this.setState({
        url: newProps.match.params.url,
        quantity: 1,
        picture: '',
      });
    } else {
      this.setDefaultItem(newProps.listItem);
    }
    this.setDefaultCategory(newProps.listCategory);
  }

  setDefaultItem = (listItem) => {
    if (this.state.url === '' && listItem.length > 0) {
      this.setState({
        url: listItem[0].url,
      });
    }
  }
  setDefaultCategory = (listCategory) => {
    if (this.state.categoryCode === '' && listCategory.length > 0) {
      this.setState({
        categoryCode: listCategory[0].code,
      });
    }
  }

  onChange = (event) => {
    const value = event.value;
    if (value > 0 && value < 301) {
      this.setState({
        quantity: value
      });
    } else {
      this.setState({
        quantity: value
      });
    }
  }

  onClick = () => {
    if (0 < this.state.quantity < 301) {
      const item = this.props.listItem.find(i => i.url === this.state.url);
      this.props.addOneQuantity({
        item: item,
        quantity: this.state.quantity,
      });
      this.props.addOneNotifi({
        title: `${this.state.quantity} ${item.name}`,
        message: "Đưa vào giỏ hàng thành công",
        level: "success",
        autoDismiss: 1,
        children: <GoToCartNoti title={`${this.state.quantity} ${item.name}`} message="Đưa vào giỏ hàng thành công" picture={item.picture[0]} />
      });
    } else {
      alert("Vui lòng chọn số lượng");
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
        const items = foundCategory.items.filter(i => i.url !== this.state.url);
        result = items.map((item, index) => {
          return (
            <SingleItem key={index} item={item} />
          )
        });
      }
    }
    return result;
  }

  showItem = () => {
    const item = this.props.listItem.find(i => i.url === this.state.url);
    console.log(this.state.url,item);
    
    if (item !== undefined) {
      return (
        <div className="container">
          <SectionHeader title={item.name} />
          <div className="row">
            <div className="col-md-2 col-4 padding-top1">
              <div className="row">
                {this.showMiniItemPicture(item.picture)}
              </div>
            </div>
            <div className="col-md-5 col-8 padding-top1">
              {this.showMainPicture(item.picture)}
            </div>
            <div className="col-md-5 col-12 padding-top1">
              <div className="detail-item">
                <span><NumberFormat value={item.singleValue} displayType={'text'} thousandSeparator={true} renderText={value => <div>{value}đ</div>} /></span>
                <p>{item.description}</p>
                <div className="row" style={{ marginLeft: '0px' }}>
                  <div className="col-6">
                    <ChooseQuantity onEmittedValue={this.onChange} quantity={this.state.quantity} />
                  </div>
                  <div className="col-3">
                    <button className="btn btn-success" onClick={this.onClick}>Mua hàng</button>
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
          {this.showItem()}
          <div className="container text-center" style={{ marginTop: '40px' }}>
            <SectionHeader title="Thực đơn khác" />
            <ul className="main-menu-category">
              {this.showAllCategory()}
            </ul>
            <hr />
            <div className="row">
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
    },
    addOneNotifi: (notifi) => {
      dispatch(addNotification(notifi.level, notifi.autoDismiss, notifi.children));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Detail);