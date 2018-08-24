import React, { Component } from 'react';
import './SingleCategory.css';

class SingleCategory extends Component {

  onClickCategory = () => {
    this.props.emittedCategoryCode({
      categoryCode: this.props.category.code
    })
  }

  render() {
    const active = this.props.active ? 'active' : '';
    const classname = `col-4 ${active}`;
    return(
      <li className={classname} onClick={this.onClickCategory}>
        <div className="menu-item" aria-expanded="true">
          <img className="img-circle" src={this.props.category.picture} alt="category-img"/>
          <span>{this.props.category.name}</span>
          <hr />
        </div>
      </li>
    )
  }
}

export default SingleCategory;