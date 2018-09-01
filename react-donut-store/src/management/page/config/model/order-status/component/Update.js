import React, { Component } from 'react';
import $ from 'jquery';
import CustomInput from '../../../../../../share/common/custom-input/CustomInput';
import * as Helper from '../../../../../../share/common/helper/Helper';
import { save } from '../OrderStatusApiCaller';
import { isFormValid } from '../../../../../../share/common/custom-validation';

class Update extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isSubmitting: false,
      updatedData: '',
      form: {
        id: { value: '', valid: false },
        name: { value: '', valid: false },
        description: { value: '', valid: false },
      },
      wasSubmitted: false,
    }
  }
  componentDidMount() {
    $('#open-modal-update').click();
    if (this.props.orderStatus) {
      const { orderStatus } = this.props;
      this.setState({
        form: {
          id: { value: orderStatus.id, valid: true },
          name: { value: orderStatus.name, valid: true },
          description: { value: orderStatus.description, valid: true },
        }
      })
    }
  }

  onCloseModal = () => {
    this.props.onEmittedCloseModalUpdate({
      name: 'showModalUpdate',
      value: false,
    })
  }
  onCloseModalAndUpdate = () => {
    this.props.onEmittedCloseModalUpdate({
      name: 'showModalUpdate',
      value: false,
      update: this.state.updatedData,
    })
  }
  onReceivedValue = (event) => {
    if (!this.state.isSubmitting) {
      this.setState({
        form: Object.assign({}, this.state.form, {
          [event.name]: { value: event.value, valid: event.valid }
        })
      })
    }
  }

  onSubmit = () => {
    if (!this.state.isSubmitting) {
      const { id, name, description } = this.state.form;
      if (isFormValid([name, description])) {
        Helper.setLoading(true);
        this.setState({
          isSubmitting: true,
        });
        const form = {
          id: id.value,
          name: name.value,
          description: description.value
        }
        save(form).then(({ data }) => {
          Helper.setLoading(false);
          this.setState({
            isSubmitting: false,
            updatedData: data,
          }, () => {
            $('#close-modal-update-and-update').click();
          });
        }).catch(({ response }) => {
          Helper.setLoading(false);
          this.setState({
            isSubmitting: false,
          }, () => alert(response.data));
        })
      } else {
        this.setState({
          wasSubmitted: true,
        })
      }
    }
  }
  render() {
    return (
      <section>
        <button style={{ display: 'none' }} type="button" id="open-modal-update"
          data-backdrop={'static'} data-keyboard={false}
          data-toggle="modal" data-target="#modal-update">
        </button>
        <div id="modal-update" className="modal fade" tabIndex={-1} role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header"><h5>Update OrderStatus</h5></div>
              <div className="modal-body">
                <CustomInput type="text" name="name" placeholder="OrderStatus's name" value={this.state.form.name.value}
                  maxLength={20} onEmittedValue={this.onReceivedValue} wasSubmitted={this.state.wasSubmitted} />
                <CustomInput type="text" name="description" placeholder="OrderStatus's description" value={this.state.form.description.value}
                  maxLength={255} onEmittedValue={this.onReceivedValue} wasSubmitted={this.state.wasSubmitted} />
              </div>
              <div className="modal-footer">
                <button style={{ display: 'none' }} id="close-modal-update-and-update" onClick={this.onCloseModalAndUpdate} data-dismiss="modal" aria-label="Close"></button>&nbsp;
                <button className="btn btn-outline-dark" disabled={this.state.isSubmitting} id="close-modal-update" onClick={this.onCloseModal} data-dismiss="modal" aria-label="Close">Back</button>&nbsp;
                <button className="btn btn-outline-primary" disabled={this.state.isSubmitting} onClick={this.onSubmit}>Update</button>
              </div>
            </div>
          </div>
        </div>
      </section >
    )
  }
}

export default Update;