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
          show={menu.show}
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
        document.getElementById("div-aside-nav-report").style.width = "185px";
        document.getElementById("config-content").style.paddingLeft = "175px";
      } else {
        document.getElementById("div-aside-nav-report").style.width = "3.9em";
        document.getElementById("config-content").style.paddingLeft = "3.1em";
      }
    })
  }
  render() {
    return(
      <ul id="aside-nav-mana">
        {this.state.isOpen ? (<li>
          <span style={{ fontSize: '30px', cursor: 'pointer', marginLeft: '130px' }} onClick={this.onOpenClose}>&#9747;</span>
        </li>) : <li style={{marginLeft: '-2.2em'}}><span style={{ fontSize: '30px', cursor: 'pointer' }} onClick={this.onOpenClose}>&#9776;</span></li>}
        {this.state.isOpen ? this.showMenu(menus) : null}
      </ul>
    );
  }
}

export default ReportAsideNav;