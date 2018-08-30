import React, { Component } from 'react';
import './FooterManagement.css';

class FooterManagement extends Component {

  render() {
    return (
      <div id="footer-management" className="container-fluid">
        <div className="row">
          <div className="col-6">
            <span>
              Copyright ©2018 by Vũ Hoàn
          </span>
          </div>
          <div className="col-6">
            <div className="float-right">
              <span>
                Version 1.0.1 beta
            </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FooterManagement;