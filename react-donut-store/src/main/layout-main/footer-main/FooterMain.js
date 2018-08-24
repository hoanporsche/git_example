import React, { Component } from 'react';
import './FooterMain.css';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { CONFIG_NAME } from '../../../share/constant/configuration.constant';

class FooterMain extends Component {

  findLogo = () => {
    const { listConfigGlobal } = this.props;
    const value = listConfigGlobal.find(i => i.name === CONFIG_NAME.LOGO);
    return value ? value.value : '';
  }

  findHeaderQuarter = () => {
    const { listConfigGlobal } = this.props;
    const value = listConfigGlobal.find(i => i.name === CONFIG_NAME.HEADQUARTER);
    return value ? value.value : '';
  }

  findHotLine = () => {
    const { listConfigGlobal } = this.props;
    const value = listConfigGlobal.find(i => i.name === CONFIG_NAME.HOT_LINE);
    return value ? value.value : '';
  }

  findEmail = () => {
    const { listConfigGlobal } = this.props;
    const value = listConfigGlobal.find(i => i.name === CONFIG_NAME.EMAIL);
    return value ? value.value : '';
  }

  render() {
    return (
      <footer >
        <div className="container">
          <hr />
          <div className="row">
            <div className="col-sm-12 col-xl-8">
              <div className="row">
                <div className="col-4 col-sm-3">
                  <img src={this.findLogo()} style={{ width: 100 }} alt="footer-img" />
                </div>
                <div className="col-8 col-sm-3">
                  <ul className="menu">
                    <li>
                      <span>Menu</span>
                    </li>
                    <li>
                      <NavLink to="/" style={{ fontSize: '14px' }}>Trang chủ</NavLink>
                    </li>
                    <li>
                      <NavLink to="/lien-he" style={{ fontSize: '14px' }}>Liên hệ</NavLink>
                    </li>
                  </ul>
                </div>
                <div className="col-12 col-sm-6">
                  <ul className="adress">
                    <li>
                      <span>Liên hệ</span>
                    </li>
                    <li>
                      <p>
                        <i className="fas fa-phone" aria-hidden="true" /> {this.findHotLine()}</p>
                    </li>
                    <li>
                      <p>
                        <i className="fas fa-map-marker" aria-hidden="true" /> Cơ sở chính: {this.findHeaderQuarter()}</p>
                    </li>
                    <li>
                      <p>
                        <i className="fas fa-envelope" aria-hidden="true" /> {this.findEmail()}</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-12 col-md-6 col-xl-4">
              <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fbrgiangvo%2F&tabs=timeline&width=340px&height=200px&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=2150713538567990" width={"340px"} height={"200px"} style={{ "border": "none", "overflow": "hidden" }} scrolling={"no"} frameBorder={"0"} allowtransparency={"true"} allow={"encrypted-media"} title="home-page"></iframe>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <p>Developed by <a href="https://www.facebook.com/vu.hoan.39">Vũ Hoàn</a> @2018</p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

const mapStateToProps = state => {
  return {
    listConfigGlobal: state.configGlobalReducer,
  }
}
export default connect(mapStateToProps, null)(FooterMain);