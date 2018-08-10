import React, { Component } from 'react';
import './FooterMain.css';
import { NavLink } from 'react-router-dom';

class FooterMain extends Component {

  render() {
    return (
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-sm-6 col-xs-12">
              <img src={"https://res.cloudinary.com/hitkeodog/image/upload/v1533569776/donut-store/banh-ran/BR6.jpg"} style={{ width: 100 }} alt="footer-img"/>
            </div>
            <div className="col-md-4 col-sm-6 col-xs-12">
              <ul className="menu">
                <li>
                  <span>Menu</span>
                </li>
                <li>
                  <NavLink to="/" style={{fontSize : '14px'}}>Trang chủ</NavLink>
                </li>
                <li>
                  <NavLink to="/lien-he" style={{fontSize : '14px'}}>Liên hệ</NavLink>
                </li>
              </ul>
            </div>
            <div className="col-md-4 col-sm-6 col-xs-12">
              <ul className="adress">
                <li>
                  <span>Liên hệ</span>
                </li>
                <li>
                  <p>
                    <i className="fas fa-phone" aria-hidden="true" />094 345 1794</p>
                </li>
                <li>
                  <p>
                    <i className="fas fa-map-marker" aria-hidden="true" />Cơ sở chính: 113/D6 Giảng Võ</p>
                </li>
                <li>
                  <p>
                    <i className="fas fa-envelope" aria-hidden="true" />banhranhoan@gmail.com</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default FooterMain;