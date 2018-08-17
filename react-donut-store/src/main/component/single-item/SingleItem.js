import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './SingleItem.css';
import NumberFormat from 'react-number-format';

class SingleItem extends Component {

  showQuickLook = () => {
    return (this.props.quickLook.toString() === 'false') ? null : (
      <span className="quick-look auto-fade" onClick={this.onClick}>
        <i className="fas fa-search"></i>
      </span>
    )
  }

  onClick = () => {
    this.props.onEmittedShowModal({showed: true, item: this.props.item});
  }

  render() {
    const to = `/thuc-don/${this.props.item.code}`;
    const fadeImage = (this.props.quickLook.toString() === 'true') ? 'fade-image' : '';
    return (
      <div id="ds-item" className={this.props.definedClass}>
        <div className="ds-single-item">
          <div className={`ds-single-item-image ${fadeImage}`} style={{ backgroundImage: `url(${this.props.item.picture[0]})` }}>
            { this.showQuickLook() }
          </div>
          <NavLink to={to} className="nav-link-item">
            <h4>{this.props.item.name}</h4>
          </NavLink>
          <span><NumberFormat value={this.props.item.singleValue} displayType={'text'} thousandSeparator={true} renderText={value => <div>{value}₫</div>} /></span>
        </div>
      </div>
    );
  }
}

SingleItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.string.isRequired,
    picture: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    singleValue: PropTypes.number.isRequired
  }),
  definedClass: PropTypes.string,
  quickLook: PropTypes.string
}
SingleItem.defaultProps = {
  definedClass: 'col-sm-4 col-md-3',
  quickLook: 'false'
}
export default SingleItem;