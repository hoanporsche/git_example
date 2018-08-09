import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './SingleItem.css';

class SingleItem extends Component {

  render() {
    return (
      <div className="col-sm-3">
        <NavLink className="ds-single-item" to="#">
          <div className="ds-single-item-image" style={{ backgroundImage: `url(${this.props.item.picture})` }} />
          <h4>{this.props.item.name}</h4>
          <p>{this.props.item.description}</p>
          <hr />
          <button type="button" className="btn btn-success"><i class="fas fa-cart-plus"></i> Mua ngay</button>
          <span>{this.props.item.singleValue} đ</span>
        </NavLink>
      </div>
    );
  }
}

export default SingleItem;