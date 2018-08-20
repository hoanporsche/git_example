import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isPhoneNumber } from '../custom-validation';

class CustomInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      valid: true,
      stringError: '',
    };
  }

  onChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value.toString().trim();
    let valid = true;
    let stringError = '';
    if ((value.toString().trim() === '') || (target.name === 'phone' && isPhoneNumber(value) !== true)) {
      valid = false;
      stringError = (target.name === 'phone' && isPhoneNumber(value) !== true) ? isPhoneNumber(value) : this.props.placeholder;
    }
    this.setState({
      valid: valid,
      stringError: stringError,
    },() => {
      this.props.onEmittedValue({
        name: target.name,
        value: value,
        valid: this.state.valid,
      });
    });
  }

  showRequired = () => {
    return this.state.valid ? null : (
        <span className="field-required">
          *Xin hãy nhập {this.state.stringError}
        </span>
      );
  }
  render() {
    return (
      <div className="form-group">
        <input type={this.props.type} className="form-control"
          placeholder={'*' + this.props.placeholder}
          onChange={this.onChange}
          name={this.props.name}
          value={this.props.value}
          maxLength={this.props.maxLength} />
        {this.showRequired()}
      </div>
    )
  }
}

CustomInput.propType = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  maxLength: PropTypes.number.isRequired,
}
export default CustomInput;