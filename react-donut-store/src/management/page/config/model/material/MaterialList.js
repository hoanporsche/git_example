import React, { Component } from 'react';
import { findListMaterial, showOrNot } from './MaterialApiCaller';
import { CONFIG, selectEnabledOption } from '../../../../../share/constant/configuration.constant';
import ReactTooltip from 'react-tooltip';
import CustomSelect from '../../../../../share/common/custom-select/CustomSelect';
// import CustomDate from '../../../../../share/common/custom-datetime/CustomDate';
import * as Helper from '../../../../../share/common/helper/Helper';
import Create from './component/Create';
import Update from './component/Update';
import NumberFormat from 'react-number-format';
import { findAllSupply } from '../supply/SupplyApiCaller';

class MaterialList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listMaterial: {},
      listSupply: [],
      params: {
        supplyId: '',
        enabled: '',
        page: 0,
        size: CONFIG.PAGE_SIZE,
        sort: 'id,desc'
      },
      updateMaterial: undefined,
      isSubmitting: false,
      showModalCreate: false,
      showModateUpdate: false,
    }
  }

  componentDidMount() {
    this.onFilter();
    findAllSupply().then(({ data }) => {
      this.setState({
        listSupply: data,
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
            updateMaterial: undefined,
          });
          this.updateList(this.state.listMaterial.content, event.update);
        }
      })
    }
  }

  onFilter = () => {
    findListMaterial(this.state.params).then(({ data }) => {
      this.setState({
        listMaterial: data,
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
  onUpdate = (material) => {
    if (!this.state.isSubmitting) {
      this.setState({
        updateMaterial: material,
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
        const list = this.state.listMaterial.content;
        this.updateList(list, data);
      }).catch(({ response }) => {
        Helper.setLoading(false);
        this.setState({
          isSubmitting: false
        }, () => Helper.catchError(response));
      })
    }
  }
  updateList = (list, data) => {
    const index = list.findIndex(i => +i.id === +data.id);
    this.setState({
      listMaterial: Object.assign({}, this.state.listMaterial, {
        content: [].concat(list.slice(0, index)).concat(data).concat(list.slice(index + 1)),
      })
    })
  }
  first = () => {
    if (!this.state.listMaterial.first) {
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
    if (!this.state.listMaterial.first) {
      this.setState({
        params: Object.assign({}, this.state.params, {
          page: this.state.listMaterial.number - 1,
        })
      }, () => {
        this.onFilter();
      });
    }
  }
  next = () => {
    if (!this.state.listMaterial.last) {
      this.setState({
        params: Object.assign({}, this.state.params, {
          page: this.state.listMaterial.number + 1,
        })
      }, () => {
        this.onFilter();
      });
    }
  }
  last = () => {
    if (!this.state.listMaterial.last) {
      this.setState({
        params: Object.assign({}, this.state.params, {
          page: this.state.listMaterial.totalPages - 1,
        })
      }, () => {
        this.onFilter();
      });
    }
  }

  showPagination = () => {
    const { totalPages } = this.state.listMaterial;
    return (totalPages) ? (<p>
      Page {(totalPages === 0) ? 0 : this.state.listMaterial.number + 1} of {totalPages}
    </p>) : (<p>Page 0 of 0</p>);
  }

  showListMaterial = () => {
    const { listMaterial } = this.state;
    return (!listMaterial.content) ? null : (
      listMaterial.content.map((material, index) => {
        return (
          <tr key={index}>
            <th scope="row">{index}</th>
            <td>{material.name}</td>
            <td>
              {material.picture.split(',').map((pic, index) => {
                return (<p key={index}><a href={pic} target="_blank">{pic}</a></p>)
              })}

            </td>
            <td>{material.supplyId.name}</td>
            <td>{material.dateCreated}</td>
            <td>{material.dateUpdated}</td>
            <td><NumberFormat value={material.singleValue} displayType={'text'} thousandSeparator={true} />₫</td>
            <td>{material.enabled ? "Yes" : "No"}</td>
            <td>
              <i className="fas fa-exchange-alt" data-tip="Đổi status" style={{ cursor: 'pointer' }} onClick={() => this.showOrNot(material.id)}></i>  &nbsp;
              <i className="fas fa-edit" data-tip="Sửa" style={{ cursor: 'pointer' }} onClick={() => this.onUpdate(material)}></i>
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
                <CustomSelect placeholder="Supply" name="supplyId" value={this.state.params.supplyId} required={false}
                  data={this.state.listSupply} onEmittedValue={this.onReceivedSelectValue} />
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
                <th scope="col">Supply</th>
                <th scope="col">Date Created</th>
                <th scope="col">Date Updated</th>
                <th scope="col">Single Value</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {this.showListMaterial()}
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
        {this.state.showModalCreate ? <Create onEmittedCloseModalCreate={this.onReceivedValue} listSupply={this.state.listSupply} /> : null}
        {this.state.showModalUpdate ? <Update onEmittedCloseModalUpdate={this.onReceivedValue} material={this.state.updateMaterial} listSupply={this.state.listSupply} /> : null}
      </div>
    )
  }
}

export default MaterialList;