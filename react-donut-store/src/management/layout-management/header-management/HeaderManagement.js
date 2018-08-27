import React, { Component } from 'react';
import { Route, Link, NavLink } from 'react-router-dom';
import { MENU_NAME, MODEL_ROUTING } from '../../../share/constant/routing.constant';
import './HeaderManagement.css';
import { connect } from 'react-redux';
import { fetAllConfigGlobal } from '../../../redux/action/config-global.constant';
import Notification from '../../component/notification/Notification';

const menus = [
  {
    name: MENU_NAME.ORDER_MANAGEMENT,
    to: MODEL_ROUTING.MANAGEMENT,
    exact: true,
  }, {
    name: MENU_NAME.MATERIAL_DAILY_REPORT,
    to: MODEL_ROUTING.MANAGEMENT + MODEL_ROUTING.MATERIAL_DAILY_REPORT,
    exact: false,
  }, {
    name: MENU_NAME.TIMEKEEPING,
    to: MODEL_ROUTING.MANAGEMENT + MODEL_ROUTING.TIMEKEEPING,
    exact: false,
  }, {
    name: MENU_NAME.CONFIG,
    to: MODEL_ROUTING.MANAGEMENT + MODEL_ROUTING.CONFIG,
    exact: false,
  },
];

// Viết như này thể hiện là 1 thẻ jsx,không phải là 1 function
const MenuLink = ({ label, to, activeOnlyWhenExact }) => {
  return (
    <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => {
      let active = match ? 'active-header' : '';
      return (
        <li className={`nav-item ${active}`}>
          <Link className='nav-link link-text' to={to}><span>{label}</span></Link>
        </li>
      )
    }}
    />
  )
}

class HeaderManagement extends Component {

  componentDidMount() {
    if (this.props.listConfigGlobal.length === 0) {
      this.props.fetchAllConfigGlobal();
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

  render() {
    return (
      <nav id="header-management" className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="/management">DONUT STORE</NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <Notification />
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
const mapStateToProps = state => {
  return {
    listConfigGlobal: state.configGlobalReducer,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchAllConfigGlobal: () => {
      dispatch(fetAllConfigGlobal());
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HeaderManagement);