import React, { Component } from 'react';
import './ChooseQuantity.css';

class ChooseQuantity extends Component {

  onChange = (event) => {
    const value = (event.target.value !== '' && isNaN(event.target.value) === false ) ? event.target.value : 1;

    if (value > 0 && value < 301) {
      this.onEmittedValue(value);
    } 
  }

  onMinius = () => {
    if (this.props.quantity > 1) {
      this.onEmittedValue(this.props.quantity - 1);
    }
  }

  onPlus = () => {
    if (this.props.quantity < 300) {
      this.onEmittedValue(this.props.quantity + 1);
    }
  }

  onEmittedValue = (quantity) => {
    this.props.onEmittedValue({
      name: 'quantity',
      value: quantity,
    })
  }

  render() {
    return (
      <div id="choose-quantity">
        <div className="input-quantity-container clearfix">
          <a className="input-quantity-minus" name="decrease" onClick={this.onMinius}><i className="fa fa-minus fa-fw"></i></a>
          <input type="text" className="input-quantity" value={this.props.quantity} onChange={this.onChange} />
          <a className="input-quantity-plus" name="increase" onClick={this.onPlus}><i className="fa fa-plus fa-fw"></i></a>
        </div>
      </div>
    )
  }
}

export default ChooseQuantity;