import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './HeaderMain.css';
import NumberFormat from 'react-number-format';
import SearchRedirect from '../../../share/common/search-redirect/SearchRedirect';
import { fetAllConfigGlobal } from '../../../redux/action/config-global.constant';
import { CONFIG_NAME } from '../../../share/constant/configuration.constant';

class HeaderMain extends Component {

  componentDidMount() {
    this.props.fetchAllConfigGlobal();
  }

  findLogo = () => {
    const { listConfigGlobal } = this.props;
    const value = listConfigGlobal.find(i => i.name === CONFIG_NAME.LOGO);
    return value ? value.value : '';
  }
  render() {
    return (
      <header className="container">
        <div id="header" className="row">
          <SearchRedirect />
          <div className="col-md-2 header-logo">
            <NavLink to={"/"} className="image-logo">
              <img src={this.findLogo()} className="image" alt="brand" />
            </NavLink>
          </div>
          <div className="col-md-5 header-cart">
            <NavLink to={"/gio-hang"} className="text-cart">
              <i className="fa fa-shopping-cart fa-fw" /> Giỏ hàng (<span>{this.props.quantity.quantities.length}</span> <span>sản phẩm</span> - <span><NumberFormat value={this.props.quantity.totalPrice} displayType={'text'} thousandSeparator={true} />₫</span>)
            </NavLink>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => {
  return {
    quantity: state.quantityReducer,
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
export default connect(mapStateToProps, mapDispatchToProps)(HeaderMain);