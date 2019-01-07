import React, { Component } from 'react';
import './FlexReport.css';
import PropTypes from 'prop-types';

class FlexReport extends Component {

  showSingle() {
    return (this.props.listFlex.length > 0) ? this.props.listFlex.map((flex, index) => {
      return (
        <li key={index} className="single-flex">
          <div className="flex-container">
            {flex.name}
            <p>{flex.sum}</p>
          </div>
        </li>
      )
    }) : null;
  }
  render() {
    return (
      <ul id="flex-report">
        {this.showSingle()}
      </ul>
    )
  }
}

FlexReport.propTypes = {
  listFlex: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    sum: PropTypes.number.isRequired,
  }))
}
FlexReport.defaultProps = {
  listFlex: [],
}
export default FlexReport;