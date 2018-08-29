import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import { MENU_NAME, MODEL_ROUTING } from '../../../share/constant/routing.constant';

const menus = [
  {
    name: MENU_NAME.CATEGORY,
    to: MODEL_ROUTING.MANAGEMENT + MODEL_ROUTING.CONFIG,
    exact: true,
  }, 
  {
    name: MENU_NAME.CONFIG_GLOBAL,
    to: MODEL_ROUTING.MANAGEMENT + MODEL_ROUTING.CONFIG + MODEL_ROUTING.CONFIG_GLOBAL,
    exact: true,
  }, 
  {
    name: MENU_NAME.ITEM,
    to: MODEL_ROUTING.MANAGEMENT + MODEL_ROUTING.CONFIG + MODEL_ROUTING.ITEM,
    exact: true,
  }, 
  {
    name: MENU_NAME.MATERIAL,
    to: MODEL_ROUTING.MANAGEMENT + MODEL_ROUTING.CONFIG + MODEL_ROUTING.MATERIAL,
    exact: true,
  }, 
  {
    name: MENU_NAME.ORDER_STATUS,
    to: MODEL_ROUTING.MANAGEMENT + MODEL_ROUTING.CONFIG + MODEL_ROUTING.ORDER_STATUS,
    exact: true,
  }, 
  {
    name: MENU_NAME.ROLE,
    to: MODEL_ROUTING.MANAGEMENT + MODEL_ROUTING.CONFIG + MODEL_ROUTING.ROLE,
    exact: true,
  }, 
  {
    name: MENU_NAME.STAFF,
    to: MODEL_ROUTING.MANAGEMENT + MODEL_ROUTING.CONFIG + MODEL_ROUTING.STAFF,
    exact: true,
  }, 
  {
    name: MENU_NAME.STORE,
    to: MODEL_ROUTING.MANAGEMENT + MODEL_ROUTING.CONFIG + MODEL_ROUTING.STORE,
    exact: true,
  }, 
  {
    name: MENU_NAME.SUPPLY,
    to: MODEL_ROUTING.MANAGEMENT + MODEL_ROUTING.CONFIG + MODEL_ROUTING.SUPPLY,
    exact: true,
  }, 
  {
    name: MENU_NAME.TIMEKEEPING_STATUS,
    to: MODEL_ROUTING.MANAGEMENT + MODEL_ROUTING.CONFIG + MODEL_ROUTING.TIMEKEEPING_STATUS,
    exact: true,
  }, 
  {
    name: MENU_NAME.USER,
    to: MODEL_ROUTING.MANAGEMENT + MODEL_ROUTING.CONFIG + MODEL_ROUTING.USER,
    exact: true,
  }, 
  {
    name: MENU_NAME.WORKING_CALENDER,
    to: MODEL_ROUTING.MANAGEMENT + MODEL_ROUTING.CONFIG + MODEL_ROUTING.WORKING_CALENDER,
    exact: true,
  }, 
];

// Viết như này thể hiện là 1 thẻ jsx,không phải là 1 function
const MenuLink = ({ label, to, activeOnlyWhenExact }) => {
  return (
    <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => {
      let active = match ? 'active-aside' : '';
      return (
        <li className={`${active}`}>
          <NavLink className='link-text' to={to}><span>{label}</span></NavLink>
        </li>
      )
    }}
    />
  )
}

class AsideNavManagement extends Component {

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
    return(
      <ul id="aside-nav-mana">
        {this.showMenu(menus)}
      </ul>
    );
  }
}

export default AsideNavManagement;