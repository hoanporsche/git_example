import React, { Component } from 'react';
import { Route, Link, NavLink } from 'react-router-dom';
// import BR6 from '../../../assets/img/donut-store/BR6.jpg';
import { connect } from 'react-redux';
import './HeaderMain.css';

const menus = [
  {
    name: 'Trang chủ',
    to: '/',
    exact: true,
  }, {
    name: 'Đặt hàng',
    to: '/dat-hang',
    exact: false,
  }, {
    name: 'Liên hệ',
    to: '/lien-he',
    exact: false,
  }
];

// Viết như này thể hiện là 1 thẻ jsx,không phải là 1 function
const MenuLink = ({ label, to, activeOnlyWhenExact }) => {
  return (
    <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => {
      let active = match ? 'active' : '';
      return (
        <li className={`nav-item ${active}`}>
          <Link className='nav-link' to={to}><span>{label}</span></Link>
        </li>
      )
    }}
    />
  )
}

class HeaderMain extends Component {

  showMenu = (menus) => {
    let result = null;
    if (menus.length > 0) {
      result = menus.map((menu, index) => {
        return (<MenuLink key={index}
          label={menu.name}
          to={menu.to}
          activeOnlyWhenExact={menu.exact}
        />
        )
      });
    }
    return result;
  }
  render() {
    const { quantities } = this.props;
    return (
      <nav className="navbar fixed-top py-0 bg-primary navbar-expand-lg py-md-0 navbar-light bg-light">
        <NavLink className="navbar-brand" to="/">
          <img src={"https://res.cloudinary.com/hitkeodog/image/upload/v1533569776/donut-store/banh-ran/BR6.jpg"} className="img-thumbnail" style={{ width: '40px', padding: 0 }} alt="brand" />
        </NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {this.showMenu(menus)}
          </ul>
          {/* <a className="my-2 my-sm-0"><span>{ quantities.length }</span></a>
          <a className="btn btn-outline-success my-2 my-sm-0" href="/dang-nhap">Đăng nhập</a> */}

        </div>
        <div className="form-inline my-2 my-lg-0">
          <a className="btn btn-sm btn-outline-secondary my-2 my-sm-0" href="/dang-nhap">Đăng nhập</a>
          <a href="/dang-nhap">
            <div className="cart-segment">
              <div className="segment-head">
                <div className="icon">
                  <i className="detail-icon"></i>
                  <span className="quantity">{quantities.length}</span>
                </div>
              </div>
            </div>
          </a>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    quantities: state.orderReducer.quantities,
  }
}

export default connect(mapStateToProps, null)(HeaderMain);