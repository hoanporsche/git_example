import React, { Component } from 'react';
import './SectionHeading.css';

class SectionHeading extends Component {

  render() {
    const { title } = this.props;
    return(
      <div className="section-heading">
        <h2 className="has-arrow">{ title }</h2>
        <div className="big-solid-yellow"></div>
        <hr className="hr-section-heading"/>
      </div>
    )
  }
}

export default SectionHeading;