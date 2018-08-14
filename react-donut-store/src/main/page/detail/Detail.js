import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetAllItem } from '../../../redux/action/item.constant';
import SectionHeading from '../../component/section-heading/SectionHeading';
import './Detail.css';
import { actAddQuantity } from '../../../redux/action/order.constant';

class Detail extends Component {

  constructor(props) {
    super(props);
    const { location, match } = this.props;
    this.state = {
      code: this.props.match.params.code,
      quantity: 0,
      inValid: true,
    }
    console.log(location);
    console.log(match);
  }

  componentDidMount() {
    let { listItem } = this.props;
    if (listItem.length === 0) {
      this.props.fetchAllItem();
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
      this.props.addOneQuantity({
        itemCode: this.state.code,
        quantity: this.state.quantity,
      });
    } else {
      alert("Vui lòng chọn số lượng");
    }
  }

  showItem = () => {
    const item = this.props.listItem.find(i => i.code === this.state.code);
    if (item !== undefined) {
      return (
        <div className="container contain">
          <SectionHeading title={item.name} />
          <div className="row">
            <div className="col-sm-4">
              <div className="item-picture" style={{ backgroundImage: `url(${item.picture})` }}></div>
            </div>
            <div className="col-sm-8">
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

  render() {
    return (
      <div className="wrapper">
        {this.showItem()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listItem: state.itemReducer,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllItem: () => {
      dispatch(fetAllItem());
    },
    addOneQuantity: (quantity) => {
      dispatch(actAddQuantity(quantity));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Detail);