import React, { Component } from 'react';
import { findAllConfigGlobal } from './ConfigGlobalApiCaller';
import ReactTooltip from 'react-tooltip';
import Update from './component/Update';

class ConfigGlobalList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listConfigGlobal: {},
      updateConfigGlobal: undefined,
      isSubmitting: false,
      showModateUpdate: false,
    }
  }

  componentDidMount() {
    this.onFilter();
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
            updateConfigGlobal: undefined,
          });
          this.updateList(this.state.listConfigGlobal, event.update);
        }
      })
    }
  }
  updateList = (list, data) => {
    const index = list.findIndex(i => i.name === data.name);
    this.setState({
      listConfigGlobal: [].concat(list.slice(0, index)).concat(data).concat(list.slice(index + 1)),
    })
  }
  onFilter = () => {
    findAllConfigGlobal().then(({ data }) => {
      this.setState({
        listConfigGlobal: data,
      });
    })
  }

  onUpdate = (configGlobal) => {
    if (!this.state.isSubmitting) {
      this.setState({
        updateConfigGlobal: configGlobal,
        showModalUpdate: true,
      })
    }
  }

  showListConfigGlobal = () => {
    const { listConfigGlobal } = this.state;
    return (!listConfigGlobal.length > 0) ? null : (
      listConfigGlobal.map((configGlobal, index) => {
        return (
          <tr key={index}>
            <th scope="row">{index}</th>
            <td>{configGlobal.name}</td>
            <td>{configGlobal.value}</td>
            <td>
              <i className="fas fa-edit" data-tip="Sửa" style={{ cursor: 'pointer' }} onClick={() => this.onUpdate(configGlobal)}></i>
            </td>
          </tr>
        );
      })
    );
  }
  render() {
    return (
      <div className="container-fluid">
        <div style={{ overflowX: 'auto' }}>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Value</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {this.showListConfigGlobal()}
            </tbody>
          </table>
        </div>
        <ReactTooltip />
        {this.state.showModalUpdate ? <Update onEmittedCloseModalUpdate={this.onReceivedValue} configGlobal={this.state.updateConfigGlobal} /> : null}
      </div>
    )
  }
}

export default ConfigGlobalList;