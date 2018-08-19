import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import './ModalSingleItem.css';
import ChooseQuantity from '../choose-quantity/ChooseQuantity';
import GoToCartNoti from '../go-to-cart-noti/GoToCartNoti';
import { connect } from 'react-redux';
import { actAddQuantity } from '../../../redux/action/quantity.constant';
import { addNotification } from '../../../redux/action/notification.constant';
import $ from 'jquery';

class ModalSingleItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
    }
  }

  componentDidMount() {
    $('#open-modal-si').click();
  }

  showSlideImage = () => {
    return this.props.item.picture.map((picture, index) => {
      return (
        <div key={index} className={`carousel-item ${(index === 0) ? 'active' : ''}`}>
          {/* <img className="d-block w-100" height={'220px'} src={picture} alt="First slide" /> */}
          <div className="d-block w-100 slide-div" style={{ backgroundImage: `url(${picture})`}}></div>
        </div>
      )
    });
  }

  showHeader = () => {
    return (
      <div className="row">
        <div className="col-6">
          <h3>{this.props.item.name}</h3>
        </div>
        <div className="col-6">
          <div className="float-right">
            <h4 style={{ display: 'inline-block', marginTop: '4px' }}>
              <NumberFormat value={this.props.item.singleValue} displayType={'text'}
                thousandSeparator={true} renderText={value => <div><span style={{ fontSize: '0.9em' }}>Chỉ từ </span><span style={{ fontSize: '1em' }}>{value}₫ </span>
                  {/* <button type="button" className="close" onClick={this.onCloseModal} data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true"> ×</span>
                  </button> */}
                </div>}
              />
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
    return (
      <section>
        <button style={{ display: 'none' }} type="button" id="open-modal-si" 
        data-backdrop={'static'} data-keyboard={false} className="btn btn-primary" 
        data-toggle="modal" data-target="#modal-single-item">
          Launch demo modal
        </button>
        <div id="modal-single-item" className="modal fade bd-example-modal-lg" tabIndex={-1} role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <div className="container ">
                  {this.showHeader()}
                  <hr style={{ marginTop: '-10px' }} />
                  <div className="row">
                    <div className="col-sm-6 col-md-4">
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
                    <div className="col-sm-6 col-md-8">
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
                            <button type="button" className="btn btn-light" onClick={this.onCloseModal} data-dismiss="modal" aria-label="Close">Quay lại</button>&nbsp;
                            <button type="button" className="btn btn-success" onClick={this.onClick} data-dismiss="modal" aria-label="Close">Mua ngay</button>
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
      </section>

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
  })
}
export default connect(null, mapDispatchToProps)(ModalSingleItem);