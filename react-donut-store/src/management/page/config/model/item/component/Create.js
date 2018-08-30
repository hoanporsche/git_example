import React, { Component } from 'react';
import $ from 'jquery';
import CustomInput from '../../../../../../share/common/custom-input/CustomInput';
import CustomSelect from '../../../../../../share/common/custom-select/CustomSelect';
import CustomTextarea from '../../../../../../share/common/custom-textarea/CustomTextarea';
import * as Helper from '../../../../../../share/common/helper/Helper';
import { save } from '../ItemApiCaller';
import { isFormValid } from '../../../../../../share/common/custom-validation';

class Create extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isSubmitting: false,
      form: {
        name: { value: '', valid: false },
        picture: { value: '', valid: false },
        categoryId: { value: '', valid: false },
        singleValue: { value: '', valid: false },
        description: { value: '', valid: false },
      },
      wasSubmitted: false,
    }
  }
  componentDidMount() {
    $('#open-modal-create').click();
  }

  onCloseModal = () => {
    if (!this.state.isSubmitting) {
      this.props.onEmittedCloseModalCreate({
        name: 'showModalCreate',
        value: false,
      })
    }
  }
  onCloseModalAndRefresh = () => {
    this.props.onEmittedCloseModalCreate({
      name: 'showModalCreate',
      value: false,
      refresh: true,
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
      const { name, picture } = this.state.form;
      if (isFormValid([name, picture])) {
        Helper.setLoading(true);
        this.setState({
          isSubmitting: true,
        });
        const form = {
          name: name.value,
          picture: picture.value
        }
        save(form).then(({ data }) => {
          Helper.setLoading(false);
          this.setState({
            isSubmitting: false,
          });
          $('#close-modal-create-and-refresh').click();
        }).catch(({ response }) => {
          Helper.setLoading(false);
          this.setState({
            isSubmitting: false,
          });
          console.log(response);
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
        <button style={{ display: 'none' }} type="button" id="open-modal-create"
          data-backdrop={'static'} data-keyboard={false}
          data-toggle="modal" data-target="#modal-create">
        </button>
        <div id="modal-create" className="modal fade" tabIndex={-1} role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header"><h5>Create Item</h5></div>
              <div className="modal-body">
                <CustomInput type="text" name="name" placeholder="Item's name" value={this.state.form.name.value}
                  maxLength={20} onEmittedValue={this.onReceivedValue} wasSubmitted={this.state.wasSubmitted} />
                <CustomInput type="text" name="singleValue" placeholder="Item's single value" value={this.state.form.singleValue.value}
                  maxLength={20} onEmittedValue={this.onReceivedValue} wasSubmitted={this.state.wasSubmitted} />
                <CustomTextarea type="text" name="picture" placeholder="Item's picture" value={this.state.form.picture.value}
                  maxLength={1000} onEmittedValue={this.onReceivedValue} wasSubmitted={this.state.wasSubmitted} />
                <CustomTextarea type="text" name="description" placeholder="Item's picture" required={false} value={this.state.form.description.value}
                  maxLength={255} onEmittedValue={this.onReceivedValue} wasSubmitted={this.state.wasSubmitted} />
              </div>
              <div className="modal-footer">
                <button style={{ display: 'none' }} id="close-modal-create-and-refresh" onClick={this.onCloseModalAndRefresh} data-dismiss="modal" aria-label="Close">Quay lại</button>&nbsp;
                <button className="btn btn-outline-dark" disabled={this.state.isSubmitting} id="close-modal-create" onClick={this.onCloseModal} data-dismiss="modal" aria-label="Close">Quay lại</button>&nbsp;
                <button className="btn btn-outline-primary" disabled={this.state.isSubmitting} onClick={this.onSubmit}>Cập nhật</button>
              </div>
            </div>
          </div>
        </div>
      </section >
    )
  }
}

export default Create;