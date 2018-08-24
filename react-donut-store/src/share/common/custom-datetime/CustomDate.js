import React, { Component } from 'react';
import PropTypes from 'prop-types';
const Datetime = require('react-datetime');

class CustomDate extends Component {

  onChange = (event) => {

    if (typeof (event) === 'object') {
      //get date from moment and format to yyy-MM-dd
      const formatDate = event.toDate().toISOString().split("T")[0];
      this.props.onEmittedValue({
        name: this.props.name,
        value: formatDate,
      });
    } else {
      this.props.onEmittedValue({
        name: this.props.name,
        value: "",
      });
    }
  }

  render() {
    return (
      <Datetime dateFormat="YYYY-MM-DD" locale="vi" timeFormat={false} onChange={this.onChange}
        inputProps={{ name: this.props.name, placeholder: this.props.placeholder, className: 'form-control' }}
      />
    )
  }

}
CustomDate.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
}
export default CustomDate;