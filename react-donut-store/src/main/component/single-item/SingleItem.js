import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './SingleItem.css';

class SingleItem extends Component {

  render() {
    const to = `/thuc-don/${this.props.item.code}`;
    return (
      <div id="ds-item" className="col-sm-3">
        <div className="ds-single-item">
          <div className="ds-single-item-image" style={{ backgroundImage: `url(${this.props.item.picture[0]})` }} />
          <NavLink to={to} className="nav-link-item">
            <h4>{this.props.item.name}</h4>
          </NavLink>
          <span>{this.props.item.singleValue}₫</span>
        </div>
      </div>
    );
  }
}

export default SingleItem;