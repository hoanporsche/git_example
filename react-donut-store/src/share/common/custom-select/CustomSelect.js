import React, { Component } from 'react';

class CustomSelect extends Component {

  constructor(props) {
    super(props);
    this.state = {
      required: false,
    };

    this.onChange = this.onChange.bind(this);
    this.showRequired = this.showRequired.bind(this);
    this.showOption = this.showOption.bind(this);
  }

  onChange(event) {
    let target = event.target;
    let value = target.value;
    this.setState({
      required: false,
    });
    if (value.toString().trim() === '' && this.props.required === true) {
      this.setState({
        required: true,
      });
    }
    this.props.onEmittedValue(target);
  }

  showRequired = () => {
    if (this.state.required === true) {
      return (
        <span className="field-required">
          *Xin hãy chọn {this.props.placeholder}
        </span>
      )
    } else {
      return null;
    }
  }

  showOption() {
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
    const iconRequired = this.props.required ? '*' : '';
    return (
      <div className="form-group">
        <select className="form-control"
          onChange={this.onChange}
          value={this.props.value}
          name={this.props.name}>
          <option value="">{iconRequired + this.props.placeholder}</option>
          {this.showOption()}
        </select>
        {this.showRequired()}
      </div>
    )
  }
}

export default CustomSelect;