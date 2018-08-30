import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CustomSearchInput extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  onChange = (event) => {
    this.setState({
      value: event.target.value.toString().trim()
    })
  }

  onKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.props.onEmittedValue({
        name: this.props.name,
        value: this.state.value
      })
    }
  }

  render() {
    return (
      <div className="form-group">
        <input type="text" className="form-control"
          placeholder={this.props.placeholder}
          onChange={this.onChange}
          onKeyPress={this.onKeyPress}
          name={this.props.name}
          value={this.props.value}
          maxLength={this.props.maxLength} />
      </div>
    )
  }
}

CustomSearchInput.propType = {
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  maxLength: PropTypes.number.isRequired,
}
export default CustomSearchInput;