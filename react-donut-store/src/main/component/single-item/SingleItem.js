import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './SingleItem.css';

class SingleItem extends Component {

  render() {
    const to = `/thuc-don/${this.props.item.code}`;
    return (
      <div id="ds-item" className="col-sm-3">
        <NavLink className="ds-single-item" to={to}>
          <div className="ds-single-item-image" style={{ backgroundImage: `url(${this.props.item.picture[0]})` }} />
          <h4>{this.props.item.name}</h4>
          <p>{this.props.item.description}</p>
          <hr />
          <span>{this.props.item.singleValue} đ</span>
        </NavLink>
      </div>
    );
  }
}

export default SingleItem;