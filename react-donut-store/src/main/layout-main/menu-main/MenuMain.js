import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './MenuMain.css';
import { ROUTING_URL, MENU_NAME } from '../../../share/constant/routing.constant';

const menus = [
  {
    name: MENU_NAME.HOME,
    to: ROUTING_URL.HOME,
    exact: true,
  }, {
    name: MENU_NAME.DETAIL,
    to: ROUTING_URL.DETAIL,
    exact: false,
  }, {
    name: MENU_NAME.CONTACT,
    to: ROUTING_URL.CONTACT,
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
        <nav id="navigation" className="navbar py-0 bg-primary navbar-expand-lg py-md-0 navbar-light bg-light menu-main  text-center">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav">
              {this.showMenu(menus)}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default HeaderMain;