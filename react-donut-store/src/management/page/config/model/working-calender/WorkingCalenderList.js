import React, { Component } from 'react';
import { findListWorkingCalender, showOrNot } from './WorkingCalenderApiCaller';
import { CONFIG, selectEnabledOption } from '../../../../../share/constant/configuration.constant';
import ReactTooltip from 'react-tooltip';
import CustomSelect from '../../../../../share/common/custom-select/CustomSelect';
// import CustomDate from '../../../../../share/common/custom-datetime/CustomDate';
import * as Helper from '../../../../../share/common/helper/Helper';
import Create from './component/Create';
import Update from './component/Update';

class WorkingCalenderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listWorkingCalender: {},
      params: {
        enabled: '',
        page: 0,
        size: CONFIG.PAGE_SIZE,
        sort: 'id,desc'
      },
      updateWorkingCalender: undefined,
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
            updateWorkingCalender: undefined,
          });
          this.updateList(this.state.listWorkingCalender.content, event.update);
        }
      })
    }
  }

  onFilter = () => {
    findListWorkingCalender(this.state.params).then(({ data }) => {
      this.setState({
        listWorkingCalender: data,
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
  onUpdate = (workingCalender) => {
    if (!this.state.isSubmitting) {
      this.setState({
        updateWorkingCalender: workingCalender,
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
        const list = this.state.listWorkingCalender.content;
        this.updateList(list, data);
      }).catch(({ response }) => {
        Helper.setLoading(false);
        this.setState({
          isSubmitting: false
        }, () => alert(response ? response.data : 'Something went wrongs!'));
      })
    }
  }
  updateList = (list, data) => {
    const index = list.findIndex(i => +i.id === +data.id);
    this.setState({
      listWorkingCalender: Object.assign({}, this.state.listWorkingCalender, {
        content: [].concat(list.slice(0, index)).concat(data).concat(list.slice(index + 1)),
      })
    })
  }
  first = () => {
    if (!this.state.listWorkingCalender.first) {
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
    if (!this.state.listWorkingCalender.first) {
      this.setState({
        params: Object.assign({}, this.state.params, {
          page: this.state.listWorkingCalender.number - 1,
        })
      }, () => {
        this.onFilter();
      });
    }
  }
  next = () => {
    if (!this.state.listWorkingCalender.last) {
      this.setState({
        params: Object.assign({}, this.state.params, {
          page: this.state.listWorkingCalender.number + 1,
        })
      }, () => {
        this.onFilter();
      });
    }
  }
  last = () => {
    if (!this.state.listWorkingCalender.last) {
      this.setState({
        params: Object.assign({}, this.state.params, {
          page: this.state.listWorkingCalender.totalPages - 1,
        })
      }, () => {
        this.onFilter();
      });
    }
  }

  showPagination = () => {
    const { totalPages } = this.state.listWorkingCalender;
    return (totalPages) ? (<p>
      Page {(totalPages === 0) ? 0 : this.state.listWorkingCalender.number + 1} of {totalPages}
    </p>) : (<p>Page 0 of 0</p>);
  }

  showListWorkingCalender = () => {
    const { listWorkingCalender } = this.state;
    return (!listWorkingCalender.content) ? null : (
      listWorkingCalender.content.map((workingCalender, index) => {
        return (
          <tr key={index}>
            <th scope="row">{index}</th>
            <td>{workingCalender.name}</td>
            <td>{workingCalender.description}</td>
            <td>{workingCalender.enabled ? "Yes" : "No"}</td>
            <td>
              <i className="fas fa-exchange-alt" data-tip="Đổi status" style={{ cursor: 'pointer' }} onClick={() => this.showOrNot(workingCalender.id)}></i>  &nbsp;
              <i className="fas fa-edit" data-tip="Sửa" style={{ cursor: 'pointer' }} onClick={() => this.onUpdate(workingCalender)}></i>
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
            </div>
          </div>
          <div className="col-md-3">
            <div className="float-right">
              <button type="button" className="btn btn-outline-success" data-tip="Lọc" onClick={this.onFilter}><i className="fas fa-filter"></i></button>&nbsp;
                  <button type="button" className="btn btn-outline-primary" data-tip="Tạo mới" onClick={this.onNew}><i className="fas fa-plus-circle"></i></button>
            </div>
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {this.showListWorkingCalender()}
            </tbody>
          </table>
        </div>
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
        {this.state.showModalUpdate ? <Update onEmittedCloseModalUpdate={this.onReceivedValue} workingCalender={this.state.updateWorkingCalender} /> : null}
      </div>
    )
  }
}

export default WorkingCalenderList;