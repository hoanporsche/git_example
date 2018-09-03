import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import { MENU_NAME, MODEL_ROUTING } from '../../../share/constant/routing.constant';
import { isAdmin, isStore } from '../../../auth/util';

const menus = [
  {
    name: MENU_NAME.MATERIAL_DAILY_REPORT,
    to: MODEL_ROUTING.MANAGEMENT + MODEL_ROUTING.REPORT,
    exact: true,
    show: isStore(),
  }, 
  {
    name: MENU_NAME.ORDER_REPORT,
    to: MODEL_ROUTING.MANAGEMENT + MODEL_ROUTING.REPORT + MODEL_ROUTING.ORDER_REPORT,
    exact: true,
    show: isAdmin(),
  }, 
];

// Viết như này thể hiện là 1 thẻ jsx,không phải là 1 function
const MenuLink = ({ label, to, activeOnlyWhenExact, show }) => {
  return (
    <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => {
      let active = match ? 'active-aside' : '';
      return show ? (
        <li className={`${active}`}>
          <NavLink className='link-text' to={to}><span>{label}</span></NavLink>
        </li>
      ) : null;
    }}
    />
  )
}

class ReportAsideNav extends Component {

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
    return(
      <ul id="aside-nav-mana">
        {this.showMenu(menus)}
      </ul>
    );
  }
}

export default ReportAsideNav;