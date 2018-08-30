import React, { Component } from 'react';
import { findListCategory, showOrNot } from './CategoryApiCaller';
import { CONFIG, selectEnabledOption } from '../../../../../share/constant/configuration.constant';
import ReactTooltip from 'react-tooltip';
import CustomSelect from '../../../../../share/common/custom-select/CustomSelect';
// import CustomDate from '../../../../../share/common/custom-datetime/CustomDate';
import * as Helper from '../../../../../share/common/helper/Helper';

class CategoryList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      listCategory: {},
      params: {
        enabled: '',
        page: 0,
        size: CONFIG.PAGE_SIZE,
        sort: 'id,desc'
      },
      isSubmitting: false,
      showModalCreate: false,
      showModateUpdate: false,
    }
  }

  componentDidMount() {
    this.onFilter();
  }

  onReceivedSelectValue = (event) => {
    if (!this.state.isSubmitting) {
      this.setState({
        params: Object.assign({}, this.state.params, { [event.name]: event.value })
      })
    }
  }

  onFilter = () => {
    findListCategory(this.state.params).then(({ data }) => {
      this.setState({
        listCategory: data,
      });
    })
  }

  onNew = () => {
    if (!this.state.isSubmitting) {
      this.setState({
        showModalCreate: true,
      })
    }
  }
  onUpdate = () => {
    if (!this.state.isSubmitting) {
      this.setState({
        showModalUpdate: true,
      })
    }
  }
  showOrNot = (id) => {
    if (!this.state.isSubmitting) {
      Helper.setLoading(true);
      this.setState({
        isSubmitting: true
      });
      showOrNot(id).then(({ data }) => {
        Helper.setLoading(false);
        this.setState({
          isSubmitting: false
        });
        this.onFilter();
      }).catch(({ response }) => {
        Helper.setLoading(false);
        this.setState({
          isSubmitting: false
        });
        console.log(response)
      })
    }
  }
  first = () => {
    if (!this.state.listCategory.first) {
      this.setState({
        params: Object.assign({}, this.state.params, {
          page: 0,
        })
      }, () => {
        this.onFilter();
      });
    }
  }

  prev = () => {
    if (!this.state.listCategory.first) {
      this.setState({
        params: Object.assign({}, this.state.params, {
          page: this.state.listCategory.number - 1,
        })
      }, () => {
        this.onFilter();
      });
    }
  }
  next = () => {
    if (!this.state.listCategory.last) {
      this.setState({
        params: Object.assign({}, this.state.params, {
          page: this.state.listCategory.number + 1,
        })
      }, () => {
        this.onFilter();
      });
    }
  }
  last = () => {
    if (!this.state.listCategory.last) {
      this.setState({
        params: Object.assign({}, this.state.params, {
          page: this.state.listCategory.totalPages - 1,
        })
      }, () => {
        this.onFilter();
      });
    }
  }

  showPagination = () => {
    const { totalPages } = this.state.listCategory;
    return (totalPages) ? (<p>
      Page {(totalPages === 0) ? 0 : this.state.listCategory.number + 1} of {totalPages}
    </p>) : (<p>Page 0 of 0</p>);
  }

  showListCategory = () => {
    const { listCategory } = this.state;
    return (!listCategory.content) ? null : (
      listCategory.content.map((category, index) => {
        return (
          <tr key={index}>
            <th scope="row">{index}</th>
            <td>{category.name}</td>
            <td><a href={category.picture} target="_blank">{category.picture}</a></td>
            <td>{category.dateCreated}</td>
            <td>{category.dateUpdated}</td>
            <td>{category.enabled ? "Yes" : "No"}</td>
            <td>
              <i className="fas fa-exchange-alt" data-tip="Đổi status" style={{ cursor: 'pointer' }} onClick={() => this.showOrNot(category.id)}></i>  &nbsp;
              <i className="fas fa-edit" data-tip="Sửa" style={{ cursor: 'pointer' }} onClick={this.onUpdate}></i>
            </td>
          </tr>
        );
      })
    );
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row padding-top1">
          <div className="col-md-9">
            <div className="col-md-2">
              <CustomSelect placeholder="Status" name="enabled" value={this.state.params.enabled} required={false}
                data={selectEnabledOption} onEmittedValue={this.onReceivedSelectValue} />
            </div>
          </div>
          <div className="col-md-3">
            <div className="float-right">
              <button type="button" className="btn btn-outline-success" data-tip="Lọc" onClick={this.onFilter}><i className="fas fa-filter"></i></button>&nbsp;
                  <button type="button" className="btn btn-outline-primary" data-tip="Tạo mới" onClick={this.onNew}><i className="fas fa-plus-circle"></i></button>
            </div>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Picture</th>
              <th scope="col">Date Created</th>
              <th scope="col">Date Updated</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.showListCategory()}
          </tbody>
        </table>
        <div className="row padding-top1">
          <div className="col-12">
            <div className="float-right">
              <div className="btn-group btn-group-sm" role="group">
                <button type="button" className="btn btn-outline-info" onClick={this.first}><i className="fas fa-angle-double-left"></i></button>
                <button type="button" className="btn btn-outline-info" onClick={this.prev}><i className="fas fa-angle-left"></i></button>
              </div>
              <div className="pagination__page-number">
                {this.showPagination()}
              </div>
              <div className="btn-group btn-group-sm" role="group">
                <button type="button" className="btn btn-outline-info" onClick={this.next}><i className="fas fa-angle-right"></i></button>
                <button type="button" className="btn btn-outline-info" onClick={this.last}><i className="fas fa-angle-double-right"></i></button>
              </div>
            </div>
          </div>
        </div>
        <ReactTooltip />
      </div>
    )
  }
}

export default CategoryList;