import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isPhoneNumber } from '../custom-validation';

class CustomInput extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      valid: true,
      stringError: '',
      value: '',
    };
  }

  onChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value.toString().trim();
    let valid = true;
    let stringError = '';
    //Kiểm tra điều kiện với field
    if ((value.toString().trim() === '') || (target.name === 'phone' && isPhoneNumber(value) !== true)) {
      valid = false;
      stringError = (target.name === 'phone' && isPhoneNumber(value) !== true) ? isPhoneNumber(value) : this.props.placeholder;
    }
    //gán vào state sau đó emit lên father
    this.setState({
      value: target.name,
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

  componentWillReceiveProps({wasSubmitted}) {
    //Dùng để xác định khi form đã ấn submit nhưng chưa nhập value, khi đó giá trị trống, ta sẽ thông báo từng thẻ input lỗi 1 ra view
    //Khi nhập lại giá trị thì tự giác mất cảnh báo
    if (wasSubmitted && this.state.value.toString().trim() === '') {
      this.setState({
        valid: false,
      })
    }
  }
  showRequired = () => {
    return this.props.required ? this.state.valid ? null : (
        <span className="field-required">
          *Xin hãy nhập {this.state.stringError}
        </span>
      ) : null;
  }

  render() {
    return (
      <div className="form-group">
        <input type={this.props.type} className={`form-control ${!this.state.valid ? 'border-field-required' : ''}`}
          placeholder={this.props.required ? '*' : '' + this.props.placeholder}
          onChange={this.onChange}
          onBlur={this.onChange}
          name={this.props.name}
          value={this.props.value}
          maxLength={this.props.maxLength} />
        {this.showRequired()}
      </div>
    )
  }
}

CustomInput.propType = {
  wasSubmitted: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  maxLength: PropTypes.number.isRequired,
  required: PropTypes.bool,
}
CustomInput.defaulProps = {
  required: true,
}
export default CustomInput;