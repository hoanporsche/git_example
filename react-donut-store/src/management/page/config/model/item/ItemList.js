import React, { Component } from 'react';
import { findListItem, showOrNot } from './ItemApiCaller';
import { CONFIG, selectEnabledOption } from '../../../../../share/constant/configuration.constant';
import ReactTooltip from 'react-tooltip';
import CustomSelect from '../../../../../share/common/custom-select/CustomSelect';
// import CustomDate from '../../../../../share/common/custom-datetime/CustomDate';
import * as Helper from '../../../../../share/common/helper/Helper';
import Create from './component/Create';
import Update from './component/Update';
import NumberFormat from 'react-number-format';
import { findAllCategory } from '../category/CategoryApiCaller';

class ItemList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      listItem: {},
      listCategory: [],
      params: {
        categoryId: '',
        enabled: '',
        page: 0,
        size: CONFIG.PAGE_SIZE,
        sort: 'id,desc'
      },
      updateItem: undefined,
      isSubmitting: false,
      showModalCreate: false,
      showModateUpdate: false,
    }
  }

  componentDidMount() {
    this.onFilter();
    findAllCategory().then(({ data }) => {
      this.setState({
        listCategory: data,
      });
    })
  }

  onReceivedSelectValue = (event) => {
    if (!this.state.isSubmitting) {
      this.setState({
        params: Object.assign({}, this.state.params, { [event.name]: event.value })
      })
    }
  }

  onReceivedValue = event => {
    if (!this.state.isSubmitting) {
      this.setState({
        [event.name]: event.value,
      }, () => {
        if (event.refresh)
          this.onFilter();
        if (event.update) {
          this.setState({
            updateItem: undefined,
          });
          this.updateList(this.state.listItem.content, event.update);
        }
      })
    }
  }

  onFilter = () => {
    findListItem(this.state.params).then(({ data }) => {
      this.setState({
        listItem: data,
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
  onUpdate = (item) => {
    if (!this.state.isSubmitting) {
      this.setState({
        updateItem: item,
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
        const list = this.state.listItem.content;
        this.updateList(list, data);
      }).catch(({ response }) => {
        Helper.setLoading(false);
        this.setState({
          isSubmitting: false
        }, () => alert(response.data));
      })
    }
  }
  updateList = (list, data) => {
    const index = list.findIndex(i => +i.id === +data.id);
    this.setState({
      listItem: Object.assign({}, this.state.listItem, {
        content: [].concat(list.slice(0, index)).concat(data).concat(list.slice(index + 1)),
      })
    })
  }
  first = () => {
    if (!this.state.listItem.first) {
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
    if (!this.state.listItem.first) {
      this.setState({
        params: Object.assign({}, this.state.params, {
          page: this.state.listItem.number - 1,
        })
      }, () => {
        this.onFilter();
      });
    }
  }
  next = () => {
    if (!this.state.listItem.last) {
      this.setState({
        params: Object.assign({}, this.state.params, {
          page: this.state.listItem.number + 1,
        })
      }, () => {
        this.onFilter();
      });
    }
  }
  last = () => {
    if (!this.state.listItem.last) {
      this.setState({
        params: Object.assign({}, this.state.params, {
          page: this.state.listItem.totalPages - 1,
        })
      }, () => {
        this.onFilter();
      });
    }
  }

  showPagination = () => {
    const { totalPages } = this.state.listItem;
    return (totalPages) ? (<p>
      Page {(totalPages === 0) ? 0 : this.state.listItem.number + 1} of {totalPages}
    </p>) : (<p>Page 0 of 0</p>);
  }

  showListItem = () => {
    const { listItem } = this.state;
    return (!listItem.content) ? null : (
      listItem.content.map((item, index) => {
        return (
          <tr key={index}>
            <th scope="row">{index}</th>
            <td>{item.name}</td>
            <td>
              {item.picture.split(',').map((pic, index) => {
                return (<p key={index}><a href={pic} target="_blank">{pic}</a></p>)
              })}

            </td>
            <td>{item.categoryId.name}</td>
            <td>{item.dateCreated}</td>
            <td>{item.dateUpdated}</td>
            <td><NumberFormat value={item.singleValue} displayType={'text'} thousandSeparator={true} />₫</td>
            <td>{item.enabled ? "Yes" : "No"}</td>
            <td>
              <i className="fas fa-exchange-alt" data-tip="Đổi status" style={{ cursor: 'pointer' }} onClick={() => this.showOrNot(item.id)}></i>  &nbsp;
              <i className="fas fa-edit" data-tip="Sửa" style={{ cursor: 'pointer' }} onClick={() => this.onUpdate(item)}></i>
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
            <div className="row">
              <div className="col-md-2">
                <CustomSelect placeholder="Status" name="enabled" value={this.state.params.enabled} required={false}
                  data={selectEnabledOption} onEmittedValue={this.onReceivedSelectValue} />
              </div>
              <div className="col-md-2">
                <CustomSelect placeholder="Category" name="categoryId" value={this.state.params.categoryId} required={false}
                  data={this.state.listCategory} onEmittedValue={this.onReceivedSelectValue} />
              </div>
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
              <th scope="col">Category</th>
              <th scope="col">Date Created</th>
              <th scope="col">Date Updated</th>
              <th scope="col">Single Value</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.showListItem()}
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
        {this.state.showModalCreate ? <Create onEmittedCloseModalCreate={this.onReceivedValue} listCategory={this.state.listCategory} /> : null}
        {this.state.showModalUpdate ? <Update onEmittedCloseModalUpdate={this.onReceivedValue} item={this.state.updateItem} listCategory={this.state.listCategory} /> : null}
      </div>
    )
  }
}

export default ItemList;