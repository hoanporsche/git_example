import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './SingleItem.css';
import NumberFormat from 'react-number-format';

class SingleItem extends Component {

  render() {
    const to = `/thuc-don/${this.props.item.code}`;
    const definedClass = (this.props.definedClass === undefined) ? "col-sm-4 col-md-3" :this.props.definedClass;
    return (
      <div id="ds-item" className={definedClass}>
        <div className="ds-single-item">
          <div className="ds-single-item-image" style={{ backgroundImage: `url(${this.props.item.picture[0]})` }} />
          <NavLink to={to} className="nav-link-item">
            <h4>{this.props.item.name}</h4>
          </NavLink>
          <span><NumberFormat value={this.props.item.singleValue} displayType={'text'} thousandSeparator={true} renderText={value => <div>{value}₫</div>}/></span>
        </div>
      </div>
    );
  }
}

export default SingleItem;