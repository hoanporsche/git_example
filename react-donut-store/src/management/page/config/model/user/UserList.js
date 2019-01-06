import React, { Component } from 'react';
import { findListUser, showOrNot, resetPassword } from './UserApiCaller';
import { CONFIG, selectEnabledOption } from '../../../../../share/constant/configuration.constant';
import ReactTooltip from 'react-tooltip';
import CustomSelect from '../../../../../share/common/custom-select/CustomSelect';
// import CustomDate from '../../../../../share/common/custom-datetime/CustomDate';
import * as Helper from '../../../../../share/common/helper/Helper';
import Create from './component/Create';
import Update from './component/Update';
import { findAllStore } from '../store/StoreApiCaller';
import { findAllRole } from '../role/RoleApiCaller';

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listUser: {},
      listStore: [],
      listRole: [],
      params: {
        storeId: '',
        roleId: '',
        enabled: '',
        page: 0,
        size: CONFIG.PAGE_SIZE,
        sort: 'id,desc'
      },
      updateUser: undefined,
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
    findAllRole().then(({ data }) => {
      this.setState({
        listRole: data,
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
            updateUser: undefined,
          });
          this.updateList(this.state.listUser.content, event.update);
        }
      })
    }
  }

  onFilter = () => {
    findListUser(this.state.params).then(({ data }) => {
      this.setState({
        listUser: data,
      });
    }).catch(({ response }) => {
      Helper.validateResponse(response);
      this.setState({
        isSubmitting: false
      }, () => Helper.catchError(response));
    })
  }

  onNew = () => {
    if (!this.state.isSubmitting) {
      this.setState({
        showModalCreate: true,
      })
    }
  }
  onUpdate = (user) => {
    if (!this.state.isSubmitting) {
      this.setState({
        updateUser: user,
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
        const list = this.state.listUser.content;
        this.updateList(list, data);
      }).catch(({ response }) => {
        Helper.setLoading(false);
        this.setState({
          isSubmitting: false
        }, () => Helper.catchError(response));
      })
    }
  }
  onResetPassword = (email) => {
    if (!this.state.isSubmitting) {
      Helper.setLoading(true);
      this.setState({
        isSubmitting: true,
      });
      resetPassword(email).then(() => {
        Helper.setLoading(false);
        this.setState({
          isSubmitting: false,
        });
      }).catch(({ response }) => {
        Helper.setLoading(false);
        this.setState({
          isSubmitting: false,
        }, () => Helper.catchError(response));
      })
    }
  }
  updateList = (list, data) => {
    const index = list.findIndex(i => +i.id === +data.id);
    this.setState({
      listUser: Object.assign({}, this.state.listUser, {
        content: [].concat(list.slice(0, index)).concat(data).concat(list.slice(index + 1)),
      })
    })
  }
  first = () => {
    if (!this.state.listUser.first) {
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
    if (!this.state.listUser.first) {
      this.setState({
        params: Object.assign({}, this.state.params, {
          page: this.state.listUser.number - 1,
        })
      }, () => {
        this.onFilter();
      });
    }
  }
  next = () => {
    if (!this.state.listUser.last) {
      this.setState({
        params: Object.assign({}, this.state.params, {
          page: this.state.listUser.number + 1,
        })
      }, () => {
        this.onFilter();
      });
    }
  }
  last = () => {
    if (!this.state.listUser.last) {
      this.setState({
        params: Object.assign({}, this.state.params, {
          page: this.state.listUser.totalPages - 1,
        })
      }, () => {
        this.onFilter();
      });
    }
  }

  showPagination = () => {
    const { totalPages } = this.state.listUser;
    return (totalPages) ? (<p>
      Page {(totalPages === 0) ? 0 : this.state.listUser.number + 1} of {totalPages}
    </p>) : (<p>Page 0 of 0</p>);
  }

  showListUser = () => {
    const { listUser } = this.state;
    return (!listUser.content) ? null : (
      listUser.content.map((user, index) => {
        return (
          <tr key={index}>
            <th scope="row">{index}</th>
            <td>{user.email}</td>
            <td><a href={user.picture} target="_blank">{user.picture}</a></td>
            <td>{user.dateCreated}</td>
            <td>{user.dateUpdated}</td>
            <td>{user.storeId.name}</td>
            <td>{user.roles.length > 0 ? user.roles[0].name : 'N/A'}</td>
            <td>{user.senderDbId ? user.senderDbId.name : 'N/A'}</td>
            <td>{user.enabled ? "Yes" : "No"}</td>
            <td>
              <i className="fas fa-exchange-alt" data-tip="Đổi status" style={{ cursor: 'pointer' }} onClick={() => this.showOrNot(user.id)}></i>  &nbsp;
              <i className="fas fa-edit" data-tip="Sửa" style={{ cursor: 'pointer' }} onClick={() => this.onUpdate(user)}></i>  &nbsp;
              <i className="fas fa-sync-alt" data-tip="Reset Password" style={{ cursor: 'pointer' }} onClick={() => this.onResetPassword(user.email)}></i>
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
                <CustomSelect placeholder="Role" name="roleId" value={this.state.params.roleId} required={false}
                  data={this.state.listRole} onEmittedValue={this.onReceivedSelectValue} />
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
                <th scope="col">Email</th>
                <th scope="col">Picture</th>
                <th scope="col">Date Created</th>
                <th scope="col">Date Updated</th>
                <th scope="col">Store</th>
                <th scope="col">Role</th>
                <th scope="col">SenderDb</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {this.showListUser()}
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
        {this.state.showModalCreate ? <Create onEmittedCloseModalCreate={this.onReceivedValue} listStore={this.state.listStore} listRole={this.state.listRole} /> : null}
        {this.state.showModalUpdate ? <Update onEmittedCloseModalUpdate={this.onReceivedValue} user={this.state.updateUser} listStore={this.state.listStore} listRole={this.state.listRole} /> : null}
      </div>
    )
  }
}

export default UserList;