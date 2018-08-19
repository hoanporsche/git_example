import React, { Component } from 'react';
import { findListCategory } from './CategoryApiCaller';
import { CONFIG } from '../../../share/constant/configuration.constant';

class CategoryList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      listCategory: [],
      params: {
        enabled: '',
        page: 0,
        size: CONFIG.PAGE_SIZE,
        sort: 'id,desc'
      }
    }
  }

  async componentDidMount() {
    await findListCategory(this.state.params).then(({data}) => {
      this.setState({
        listCategory: data.content,
      });
    })
  }

  showListCategory = () => {
    const { listCategory } = this.state;
    return (listCategory === 0) ? null : (
      listCategory.map((category, index) => {
        return (
          <div key={index} className="row">
            {category.name}
          </div>
        );
      })
    );
  }

  render() {
    return (
      <div className="container">
        CategoryList
        {this.showListCategory()}
      </div>
    )
  }
}

export default CategoryList;