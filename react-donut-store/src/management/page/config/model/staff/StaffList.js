import React, { Component } from 'react';
import { findListStaff, showOrNot } from './StaffApiCaller';
import { CONFIG, selectEnabledOption } from '../../../../../share/constant/configuration.constant';
import ReactTooltip from 'react-tooltip';
import CustomSelect from '../../../../../share/common/custom-select/CustomSelect';
// import CustomDate from '../../../../../share/common/custom-datetime/CustomDate';
import * as Helper from '../../../../../share/common/helper/Helper';
import Create from './component/Create';
import Update from './component/Update';
import NumberFormat from 'react-number-format';
import { findAllStore } from '../store/StoreApiCaller';
import { findAllWorkingCalender } from '../working-calender/WorkingCalenderApiCaller';

class StaffList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listStaff: {},
      listStore: [],
      listWorkingCalender: [],
      params: {
        storeId: '',
        workingCalenderId: '',
        enabled: '',
        page: 0,
        size: CONFIG.PAGE_SIZE,
        sort: 'id,desc'
      },
      updateStaff: undefined,
      isSubmitting: false,
      showModalCreate: false,
      showModateUpdate: false,
    }
  }

  componentDidMount() {
    this.onFilter();
    findAllStore().then(({ data }) => {
      this.setState({
        listStore: data,
      });
    });
    findAllWorkingCalender().then(({ data }) => {
      this.setState({
        listWorkingCalender: data,
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
            updateStaff: undefined,
          });
          this.updateList(this.state.listStaff.content, event.update);
        }
      })
    }
  }

  onFilter = () => {
    findListStaff(this.state.params).then(({ data }) => {
      this.setState({
        listStaff: data,
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
  onUpdate = (staff) => {
    if (!this.state.isSubmitting) {
      this.setState({
        updateStaff: staff,
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
        const list = this.state.listStaff.content;
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
      listStaff: Object.assign({}, this.state.listStaff, {
        content: [].concat(list.slice(0, index)).concat(data).concat(list.slice(index + 1)),
      })
    })
  }
  first = () => {
    if (!this.state.listStaff.first) {
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
    if (!this.state.listStaff.first) {
      this.setState({
        params: Object.assign({}, this.state.params, {
          page: this.state.listStaff.number - 1,
        })
      }, () => {
        this.onFilter();
      });
    }
  }
  next = () => {
    if (!this.state.listStaff.last) {
      this.setState({
        params: Object.assign({}, this.state.params, {
          page: this.state.listStaff.number + 1,
        })
      }, () => {
        this.onFilter();
      });
    }
  }
  last = () => {
    if (!this.state.listStaff.last) {
      this.setState({
        params: Object.assign({}, this.state.params, {
          page: this.state.listStaff.totalPages - 1,
        })
      }, () => {
        this.onFilter();
      });
    }
  }

  showPagination = () => {
    const { totalPages } = this.state.listStaff;
    return (totalPages) ? (<p>
      Page {(totalPages === 0) ? 0 : this.state.listStaff.number + 1} of {totalPages}
    </p>) : (<p>Page 0 of 0</p>);
  }

  showListStaff = () => {
    const { listStaff } = this.state;
    return (!listStaff.content) ? null : (
      listStaff.content.map((staff, index) => {
        return (
          <tr key={index}>
            <th scope="row">{index}</th>
            <td>{staff.name}</td>
            <td><a href={staff.picture} target="_blank">{staff.picture}</a></td>
            <td>{staff.storeId.name}</td>
            <td>{staff.dateCreated}</td>
            <td>{staff.dateUpdated}</td>
            <td>{staff.phone}</td>
            <td>{staff.address}</td>
            <td>{staff.identityCard}</td>
            <td>{staff.homeTown}</td>
            <td><NumberFormat value={staff.salary} displayType={'text'} thousandSeparator={true} />₫</td>
            <td>{staff.workingCalenderId.name}</td>
            <td>{staff.enabled ? "Yes" : "No"}</td>
            <td>
              <i className="fas fa-exchange-alt" data-tip="Đổi status" style={{ cursor: 'pointer' }} onClick={() => this.showOrNot(staff.id)}></i>  &nbsp;
              <i className="fas fa-edit" data-tip="Sửa" style={{ cursor: 'pointer' }} onClick={() => this.onUpdate(staff)}></i>
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
                <CustomSelect placeholder="Store" name="storeId" value={this.state.params.storeId} required={false}
                  data={this.state.listStore} onEmittedValue={this.onReceivedSelectValue} />
              </div>
              <div className="col-md-2">
                <CustomSelect placeholder="Working Calender" name="workingCalenderId" value={this.state.params.workingCalenderId} required={false}
                  data={this.state.listWorkingCalender} onEmittedValue={this.onReceivedSelectValue} />
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
                <th scope="col">Picture</th>
                <th scope="col">Store</th>
                <th scope="col">Date Created</th>
                <th scope="col">Date Updated</th>
                <th scope="col">Phone</th>
                <th scope="col">Address</th>
                <th scope="col">Identity Card</th>
                <th scope="col">Home Town</th>
                <th scope="col">Salary</th>
                <th scope="col">Working calender</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {this.showListStaff()}
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
        {this.state.showModalCreate ? <Create onEmittedCloseModalCreate={this.onReceivedValue} listStore={this.state.listStore} listWorkingCalender={this.state.listWorkingCalender} /> : null}
        {this.state.showModalUpdate ? <Update onEmittedCloseModalUpdate={this.onReceivedValue} staff={this.state.updateStaff} listStore={this.state.listStore} listWorkingCalender={this.state.listWorkingCalender} /> : null}
      </div>
    )
  }
}

export default StaffList;