import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './MenuMain.css';

const menus = [
  {
    name: 'Trang chủ',
    to: '/',
    exact: true,
  }, {
    name: 'Thực đơn',
    to: '/thuc-don',
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
    return (
      <div className="container">

        <nav id="navigation" className="navbar py-0 bg-primary navbar-expand-lg py-md-0 navbar-light bg-light menu-main">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav text-center">
              {this.showMenu(menus)}
            </ul>

          </div>

      </nav>
      </div>
    );
  }
}

export default HeaderMain;