import React, { Component } from 'react';
import $ from 'jquery';
import CustomInput from '../../../../../../share/common/custom-input/CustomInput';
import * as Helper from '../../../../../../share/common/helper/Helper';
import { save } from '../StoreApiCaller';
import { isFormValid } from '../../../../../../share/common/custom-validation';

class Create extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isSubmitting: false,
      form: {
        name: { value: '', valid: false },
        picture: { value: '', valid: false },
        phone: { value: '', valid: false },
        address: { value: '', valid: false },
        lat: { value: '', valid: false },
        lng: { value: '', valid: false },
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
      const { name, picture, phone, address, lat, lng } = this.state.form;
      if (isFormValid([name, picture, phone, address, lat, lng])) {
        Helper.setLoading(true);
        this.setState({
          isSubmitting: true,
        });
        const form = {
          name: name.value,
          picture: picture.value,
          phone: phone.value,
          address: address.value,
          lat: lat.value,
          lng: lng.value,
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
              <div className="modal-header"><h5>Create Store</h5></div>
              <div className="modal-body">
                <CustomInput type="text" name="name" placeholder="Store's name" value={this.state.form.name.value}
                  maxLength={20} onEmittedValue={this.onReceivedValue} wasSubmitted={this.state.wasSubmitted} />
                <CustomInput type="text" name="picture" placeholder="Store's picture" value={this.state.form.picture.value}
                  maxLength={255} onEmittedValue={this.onReceivedValue} wasSubmitted={this.state.wasSubmitted} />
                <CustomInput type="text" name="phone" placeholder="Store's phone" value={this.state.form.phone.value}
                  maxLength={20} onEmittedValue={this.onReceivedValue} wasSubmitted={this.state.wasSubmitted} />
                <CustomInput type="text" name="address" placeholder="Store's address" value={this.state.form.address.value}
                  maxLength={60} onEmittedValue={this.onReceivedValue} wasSubmitted={this.state.wasSubmitted} />
                <CustomInput type="text" name="lat" placeholder="Store's lat" value={this.state.form.lat.value}
                  maxLength={20} onEmittedValue={this.onReceivedValue} wasSubmitted={this.state.wasSubmitted} />
                <CustomInput type="text" name="lng" placeholder="Store's lng" value={this.state.form.lng.value}
                  maxLength={20} onEmittedValue={this.onReceivedValue} wasSubmitted={this.state.wasSubmitted} />
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

export default Create;