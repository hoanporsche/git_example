import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CustomSelect extends Component {

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
    if (value.toString().trim() === '') {
      valid = false;
      stringError = this.props.placeholder;
    }
    this.setState({
      valid: valid,
      stringError: stringError,
    }, () => {
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
        *Xin hãy chọn {this.props.placeholder}
      </span>
    );
  }

  showOption = () => {
    let result = null;
    if (this.props.data.length > 0) {
      result = this.props.data.map((data, index) => {
        if (data.id !== undefined) {
          return (
            <option key={index} value={data.id}>{data.name}</option>
          )
        }
        return (
          <option key={index} value={data.code}>{data.name}</option>
        )
      });
    }
    return result;
  }
  render() {
    return (
      <div className="form-group">
        <select className="form-control"
          onChange={this.onChange}
          value={this.props.value}
          name={this.props.name}>
          <option value="">{'*' + this.props.placeholder}</option>
          {this.showOption()}
        </select>
        {this.showRequired()}
      </div>
    )
  }
}

CustomSelect.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  name: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
}
export default CustomSelect;