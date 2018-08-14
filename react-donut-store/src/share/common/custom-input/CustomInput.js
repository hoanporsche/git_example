import React, { Component } from 'react';

/**
 * props: placeHolder, value, validate, required,maxLength
 */
class CustomInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      required : false,
    };
    
    this.onChange = this.onChange.bind(this);
    this.showRequired = this.showRequired.bind(this);
  }

  onChange(event) {
    let target = event.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      required : false,
    });
    if ((value.toString().trim() === '' || value === false) && this.props.required === true) {
      this.setState({
        required : true,
      });
    } 
    this.props.onEmittedValue(target);
  }

  showRequired = () => {
    if (this.state.required === true) {
      return (
        <span className="field-required">
          *Xin hãy nhập {this.props.placeholder}
        </span>
      )
    } else {
      return null;
    }
  }
  render() {
    const iconRequired = this.props.required ? '*' : '';
    return (
      <div className="form-group">
        <input type={this.props.type} className="form-control"
          placeholder={iconRequired + this.props.placeholder}
          onChange={this.onChange}
          name={this.props.name}
          value={this.props.value}
          maxLength={this.props.maxLength} />
        {this.showRequired()}
      </div>
    )
  }
}

export default CustomInput;