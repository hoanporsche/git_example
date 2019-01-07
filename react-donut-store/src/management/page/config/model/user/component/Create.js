import React, { Component } from 'react';
import $ from 'jquery';
import CustomInput from '../../../../../../share/common/custom-input/CustomInput';
import CustomSelect from '../../../../../../share/common/custom-select/CustomSelect';
import CustomTextarea from '../../../../../../share/common/custom-textarea/CustomTextarea';
import * as Helper from '../../../../../../share/common/helper/Helper';
import { save } from '../UserApiCaller';
import { isFormValid } from '../../../../../../share/common/custom-validation';
import PropTypes from 'prop-types';

class Create extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isSubmitting: false,
      form: {
        email: { value: '', valid: false },
        picture: { value: '', valid: false },
        storeId: { value: '', valid: false },
        roleId: { value: '', valid: false },
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
      const { email, picture, storeId, roleId } = this.state.form;
      if (isFormValid([email, picture, storeId, roleId])) {
        Helper.setLoading(true);
        this.setState({
          isSubmitting: true,
        });
        const form = {
          email: email.value,
          picture: picture.value,
          storeId: +storeId.value,
          roleId: +roleId.value,
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
          }, () => Helper.catchError(response));
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
              <div className="modal-header"><h5>Create User</h5></div>
              <div className="modal-body">
                <CustomInput type="text" name="email" placeholder="User's email" value={this.state.form.email.value}
                  maxLength={100} onEmittedValue={this.onReceivedValue} wasSubmitted={this.state.wasSubmitted} />
                <CustomTextarea type="text" name="picture" placeholder="User's picture" value={this.state.form.picture.value}
                  maxLength={255} onEmittedValue={this.onReceivedValue} wasSubmitted={this.state.wasSubmitted} required={false}/>
                <CustomSelect placeholder="Store" name="storeId" value={this.state.form.storeId.value}
                  data={this.props.listStore} onEmittedValue={this.onReceivedValue} wasSubmitted={this.state.wasSubmitted} />
                <CustomSelect placeholder="Role" name="roleId" value={this.state.form.roleId.value}
                  data={this.props.listRole} onEmittedValue={this.onReceivedValue} wasSubmitted={this.state.wasSubmitted} />
              </div>
              <div className="modal-footer">
                <button style={{ display: 'none' }} id="close-modal-create-and-refresh" onClick={this.onCloseModalAndRefresh} data-dismiss="modal" aria-label="Close"></button>&nbsp;
                <button className="btn btn-outline-dark" disabled={this.state.isSubmitting} id="close-modal-create" onClick={this.onCloseModal} data-dismiss="modal" aria-label="Close">Back</button>&nbsp;
                <button className="btn btn-outline-primary" disabled={this.state.isSubmitting} onClick={this.onSubmit}>Create</button>
              </div>
            </div>
          </div>
        </div>
      </section >
    )
  }
}
Create.propTypes = {
  listStore: PropTypes.array,
  listRole: PropTypes.array,
}
Create.defaultProps = {
  listStore: [],
  listRole: [],
}
export default Create;