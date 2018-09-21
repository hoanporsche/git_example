import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import { MENU_NAME, MODEL_ROUTING } from '../../../share/constant/routing.constant';
import './HeaderManagement.css';
import Notification from '../../component/notification/Notification';
import UserAvatar from '../../component/user-avatar/UserAvatar';
import { isAdmin, isStore } from '../../../auth/util';

const menus = [
  {
    name: MENU_NAME.ORDER_MANAGEMENT,
    to: MODEL_ROUTING.MANAGEMENT,
    exact: true,
    show: isStore(),
  }, {
    name: MENU_NAME.REPORT,
    to: MODEL_ROUTING.MANAGEMENT + MODEL_ROUTING.REPORT,
    exact: true,
    show: isStore(),
  }, {
    name: MENU_NAME.TIMEKEEPING,
    to: MODEL_ROUTING.MANAGEMENT + MODEL_ROUTING.TIMEKEEPING,
    exact: true,
    show: isStore(),
  }, {
    name: MENU_NAME.CONFIG,
    to: MODEL_ROUTING.MANAGEMENT + MODEL_ROUTING.CONFIG,
    exact: false,
    show: isAdmin(),
  },
];

// Viết như này thể hiện là 1 thẻ jsx,không phải là 1 function
const MenuLink = ({ label, to, activeOnlyWhenExact, show }) => {
  return (
    <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => {
      let active = match ? 'active-header' : '';
      return show ? (
        <li className={`nav-item ${active}`}>
          <NavLink className='nav-link link-text' to={to}><span>{label}</span></NavLink>
        </li>
      ) : null;
    }}
    />
  )
}

class HeaderManagement extends Component {
  showMenu = (menus) => {
    let result = null;
    if (menus.length > 0) {
      result = menus.map((menu, index) => {
        return (<MenuLink key={index}
          label={menu.name}
          to={menu.to}
          activeOnlyWhenExact={menu.exact}
          show={menu.show}
        />
        )
      });
    }
    return result;
  }

  render() {
    return (
      <nav id="header-management" className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="/management">DONUT STORE</NavLink>
        <Notification />
        <UserAvatar />
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {this.showMenu(menus)}
          </ul>
          {/* <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> */}
        </div>
      </nav>
    );
  }
}

export default HeaderManagement;