import React, { Component } from 'react';
import { findListSupply, showOrNot } from './SupplyApiCaller';
import { CONFIG, selectEnabledOption } from '../../../../../share/constant/configuration.constant';
import ReactTooltip from 'react-tooltip';
import CustomSelect from '../../../../../share/common/custom-select/CustomSelect';
// import CustomDate from '../../../../../share/common/custom-datetime/CustomDate';
import * as Helper from '../../../../../share/common/helper/Helper';
import Create from './component/Create';
import Update from './component/Update';


class SupplyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listSupply: {},
      params: {
        enabled: '',
        page: 0,
        size: CONFIG.PAGE_SIZE,
        sort: 'id,desc'
      },
      updateSupply: undefined,
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

  onReceivedValue = event => {
    if (!this.state.isSubmitting) {
      this.setState({
        [event.name]: event.value,
      }, () => {
        if (event.refresh)
          this.onFilter();
        if (event.update) {
          this.setState({
            updateSupply: undefined,
          });
          this.updateList(this.state.listSupply.content, event.update);
        }
      })
    }
  }

  onFilter = () => {
    findListSupply(this.state.params).then(({ data }) => {
      this.setState({
        listSupply: data,
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
  onUpdate = (supply) => {
    if (!this.state.isSubmitting) {
      this.setState({
        updateSupply: supply,
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
        const list = this.state.listSupply.content;
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
      listSupply: Object.assign({}, this.state.listSupply, {
        content: [].concat(list.slice(0, index)).concat(data).concat(list.slice(index + 1)),
      })
    })
  }
  first = () => {
    if (!this.state.listSupply.first) {
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
    if (!this.state.listSupply.first) {
      this.setState({
        params: Object.assign({}, this.state.params, {
          page: this.state.listSupply.number - 1,
        })
      }, () => {
        this.onFilter();
      });
    }
  }
  next = () => {
    if (!this.state.listSupply.last) {
      this.setState({
        params: Object.assign({}, this.state.params, {
          page: this.state.listSupply.number + 1,
        })
      }, () => {
        this.onFilter();
      });
    }
  }
  last = () => {
    if (!this.state.listSupply.last) {
      this.setState({
        params: Object.assign({}, this.state.params, {
          page: this.state.listSupply.totalPages - 1,
        })
      }, () => {
        this.onFilter();
      });
    }
  }

  showPagination = () => {
    const { totalPages } = this.state.listSupply;
    return (totalPages) ? (<p>
      Page {(totalPages === 0) ? 0 : this.state.listSupply.number + 1} of {totalPages}
    </p>) : (<p>Page 0 of 0</p>);
  }

  showListSupply = () => {
    const { listSupply } = this.state;
    return (!listSupply.content) ? null : (
      listSupply.content.map((supply, index) => {
        return (
          <tr key={index}>
            <th scope="row">{index}</th>
            <td>{supply.name}</td>
            <td>{supply.phone}</td>
            <td>{supply.address}</td>
            <td>{supply.dateCreated}</td>
            <td>{supply.dateUpdated}</td>
            <td>{supply.enabled ? "Yes" : "No"}</td>
            <td>
              <i className="fas fa-exchange-alt" data-tip="Đổi status" style={{ cursor: 'pointer' }} onClick={() => this.showOrNot(supply.id)}></i>  &nbsp;
              <i className="fas fa-edit" data-tip="Sửa" style={{ cursor: 'pointer' }} onClick={() => this.onUpdate(supply)}></i>
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
              <th scope="col">Phone</th>
              <th scope="col">Address</th>
              <th scope="col">Date Created</th>
              <th scope="col">Date Updated</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.showListSupply()}
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
        {this.state.showModalCreate ? <Create onEmittedCloseModalCreate={this.onReceivedValue} /> : null}
        {this.state.showModalUpdate ? <Update onEmittedCloseModalUpdate={this.onReceivedValue} supply={this.state.updateSupply} /> : null}
      </div>
    )
  }
}

export default SupplyList;