import React, { Component } from 'react';
import SectionHeading from '../../component/section-heading/SectionHeading';
import './Contact.css';

class Contact extends Component {

  render() {
    return (
      <div className="wrapper">
        <div className="container contain">
          <SectionHeading title="Liên Hệ" />
        </div>
      </div>
    );
  }
}

export default Contact;