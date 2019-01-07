import React, { Component } from 'react';
import $ from 'jquery';
import CustomInput from '../../../../../../share/common/custom-input/CustomInput';
import CustomSelect from '../../../../../../share/common/custom-select/CustomSelect';
import CustomTextarea from '../../../../../../share/common/custom-textarea/CustomTextarea';
import * as Helper from '../../../../../../share/common/helper/Helper';
import { save } from '../StaffApiCaller';
import { isFormValid } from '../../../../../../share/common/custom-validation';
import PropTypes from 'prop-types';

class Create extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isSubmitting: false,
      form: {
        name: { value: '', valid: false },
        picture: { value: '', valid: false },
        storeId: { value: '', valid: false },
        phone: { value: '', valid: false },
        address: { value: '', valid: false },
        identityCard: { value: '', valid: false },
        homeTown: { value: '', valid: false },
        salary: { value: '', valid: false },
        workingCalenderId: { value: '', valid: false },
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
      const { name, picture, storeId, phone, address, identityCard, homeTown, salary, workingCalenderId } = this.state.form;
      if (isFormValid([name, picture, storeId, phone, address, identityCard, homeTown, salary, workingCalenderId])) {
        Helper.setLoading(true);
        this.setState({
          isSubmitting: true,
        });
        const form = {
          name: name.value,
          picture: picture.value,
          storeId: +storeId.value,
          phone: phone.value,
          address: address.value,
          identityCard: +identityCard.value,
          homeTown: homeTown.value,
          salary: salary.value,
          workingCalenderId: +workingCalenderId.value,
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
              <div className="modal-header"><h5>Create Staff</h5></div>
              <div className="modal-body">
                <CustomInput type="text" name="name" placeholder="Staff's name" value={this.state.form.name.value}
                  maxLength={20} onEmittedValue={this.onReceivedValue} wasSubmitted={this.state.wasSubmitted} />
                <CustomTextarea type="text" name="picture" placeholder="Staff's picture" value={this.state.form.picture.value}
                  maxLength={255} onEmittedValue={this.onReceivedValue} wasSubmitted={this.state.wasSubmitted} />
                <CustomSelect placeholder="Store" name="storeId" value={this.state.form.storeId.value}
                  data={this.props.listStore} onEmittedValue={this.onReceivedValue} wasSubmitted={this.state.wasSubmitted} />
                <CustomInput type="text" name="phone" placeholder="Staff's phone" value={this.state.form.phone.value}
                  maxLength={20} onEmittedValue={this.onReceivedValue} wasSubmitted={this.state.wasSubmitted} />
                <CustomInput type="text" name="address" placeholder="Staff's address" required={false} value={this.state.form.address.value}
                  maxLength={255} onEmittedValue={this.onReceivedValue} wasSubmitted={this.state.wasSubmitted} />
                <CustomInput type="text" name="identityCard" placeholder="Staff's identityCard" required={false} value={this.state.form.identityCard.value}
                  maxLength={12} onEmittedValue={this.onReceivedValue} wasSubmitted={this.state.wasSubmitted} />
                <CustomInput type="text" name="homeTown" placeholder="Staff's homeTown" required={false} value={this.state.form.homeTown.value}
                  maxLength={255} onEmittedValue={this.onReceivedValue} wasSubmitted={this.state.wasSubmitted} />
                <CustomInput type="text" name="salary" placeholder="Staff's salary" required={false} value={this.state.form.salary.value}
                  maxLength={9} onEmittedValue={this.onReceivedValue} wasSubmitted={this.state.wasSubmitted} />
                <CustomSelect placeholder="Working Calender" name="workingCalenderId" value={this.state.form.workingCalenderId.value}
                  data={this.props.listWorkingCalender} onEmittedValue={this.onReceivedValue} wasSubmitted={this.state.wasSubmitted} />
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
  listWorkingCalender: PropTypes.array,
}
Create.defaultProps = {
  listStore: [],
  listWorkingCalender: [],
}
export default Create;