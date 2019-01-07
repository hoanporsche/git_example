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

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    }
  }

  componentDidMount() {
    const width = window.document.body.scrollWidth;
    if (width >= 992) {
      this.onOpenClose();
    }
  }
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

  onOpenClose = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    }, () => {
      if (this.state.isOpen) {
        document.getElementById("div-aside-nav-mana").style.width = "185px";
        document.getElementById("config-content").style.paddingLeft = "175px";
      } else {
        document.getElementById("div-aside-nav-mana").style.width = "3.9em";
        document.getElementById("config-content").style.paddingLeft = "3.1em";
      }
    })
  }

  render() {
    return (
      <ul id="aside-nav-mana">
        {this.state.isOpen ? (<li>
          <span style={{ fontSize: '30px', cursor: 'pointer', marginLeft: '130px' }} onClick={this.onOpenClose}>&#9747;</span>
        </li>) : <li style={{marginLeft: '-2.2em'}}><span style={{ fontSize: '30px', cursor: 'pointer' }} onClick={this.onOpenClose}>&#9776;</span></li>}
        {this.state.isOpen ? this.showMenu(menus) : null}
      </ul>
    );
  }
}

export default AsideNavManagement;