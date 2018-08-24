import React, { Component } from 'react';
import './SectionHeader.css';

class SectionHeader extends Component {

  render() {
    const { title } = this.props;
    return (
      <div id="section-header" className="text-center">
        <h1>{title}</h1>
      </div>
    )
  }
}

export default SectionHeader;