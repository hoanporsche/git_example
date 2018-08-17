import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import './ModalSingleItem.css';
import ChooseQuantity from '../choose-quantity/ChooseQuantity';
import GoToCartNoti from '../go-to-cart-noti/GoToCartNoti';
import { connect } from 'react-redux';
import { actAddQuantity } from '../../../redux/action/order.constant';
import { addNotification } from '../../../redux/action/notification.constant';
import $ from 'jquery';

class ModalSingleItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      inValid: false,
    }
  }

  componentDidMount() {
    $(this.getDOMNode()).modal('show');
        // $(this.getDOMNode()).on('hidden.bs.modal', this.props.handleHideModal);
  }
  // componentWillReceiveProps() {
  //   this.setState({
  //     quantity: 1,
  //     inValid: false,
  //   })
  // }

  showSlideImage = () => {
    let result = null;
    if (this.props.item.name !== undefined && this.props.item.picture.length > 0) {
      result = this.props.item.picture.map((picture, index) => {
        // const actived = (index === 0) ? 'active' : '';
        return (
          <div key={index} className={`carousel-item ${(index === 0) ? 'active' : ''}`}>
            <img className="d-block w-100" height={'220px'} src={picture} alt="First slide" />
          </div>
        )
      });
    }
    return result;
  }

  showHeader = () => {
    return (this.props.item.name === undefined) ? null : (
      <div className="row">
        <div className="col-6">
          <h3>{this.props.item.name}</h3>
        </div>
        <div className="col-6">
          <div className="float-right">
            <h4 style={{ display: 'inline-block', marginTop: '4px' }}>
              <NumberFormat value={this.props.item.singleValue} displayType={'text'}
                thousandSeparator={true} renderText={value => <div><span style={{ fontSize: '0.9em' }}>Chỉ từ </span><span style={{ fontSize: '1em' }}>{value}₫ </span><button type="button" className="close" onClick={this.onCloseModal}>
                  <span aria-hidden="true"> ×</span>
                </button></div>} />
            </h4>
          </div>
        </div>
      </div>
    );
  }

  onCloseModal = () => {
    this.props.onEmittedCloseModal({
      showed: false
    })
  }
  onChange = (event) => {
    const value = event.value;
    if (value > 0 && value < 301) {
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
    if (0 < this.state.quantity < 301) {
      const item = this.props.item;
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
      this.onCloseModal();
    } else {
      alert("Vui lòng chọn số lượng");
    }
  }

  render() {
    // const showed = (this.props.showed.toString() === 'true') ? 'show display-block' : 'display-none';
    return (
      <div id="modal-single-item" className="modal fade bd-example-modal-lg" tabIndex={-1} role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <div className="container ">
                {this.showHeader()}
                <hr />
                <div className="row">
                  <div className="col-md-4">
                    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                      <ol className="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to={0} className="active" />
                        <li data-target="#carouselExampleIndicators" data-slide-to={1} />
                        <li data-target="#carouselExampleIndicators" data-slide-to={2} />
                      </ol>
                      <div className="carousel-inner">
                        {this.showSlideImage()}
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
                  </div>
                  <div className="col-md-8">
                    <p style={{ fontSize: '1.3em' }}>{this.props.item.description}</p>
                    <div className="row">
                      <div className="col-3">
                        Số lượng:
                      </div>
                      <div className="col-9">
                        <ChooseQuantity onEmittedValue={this.onChange} quantity={this.state.quantity} />
                      </div>
                      <div className="col-12">
                        <div className="float-right">
                          <button className="btn btn-success" onClick={this.onClick}>Mua ngay</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addOneQuantity: (quantity) => {
      dispatch(actAddQuantity(quantity));
    },
    addOneNotifi: (notifi) => {
      dispatch(addNotification(notifi.level, notifi.autoDismiss, notifi.children));
    }
  }
}

ModalSingleItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.string,
    picture: PropTypes.array,
    name: PropTypes.string,
    singleValue: PropTypes.number
  }),
  showed: PropTypes.bool.isRequired,
}
export default connect(null, mapDispatchToProps)(ModalSingleItem);