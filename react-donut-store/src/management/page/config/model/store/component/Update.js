import React, { Component } from 'react';
import $ from 'jquery';
import CustomInput from '../../../../../../share/common/custom-input/CustomInput';
import * as Helper from '../../../../../../share/common/helper/Helper';
import { save } from '../StoreApiCaller';
import { isFormValid } from '../../../../../../share/common/custom-validation';

class Update extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isSubmitting: false,
      updatedData: '',
      form: {
        id: { value: '', valid: false },
        code: { value: '', valid: false },
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
    $('#open-modal-update').click();
    if (this.props.store) {
      const { store } = this.props;
      this.setState({
        form: {
          id: { value: store.id, valid: true },
          code: { value: store.code, valid: true },
          name: { value: store.name, valid: true },
          picture: { value: store.picture, valid: true },
          phone: { value: store.phone, valid: true },
          address: { value: store.address, valid: true },
          lat: { value: store.lat, valid: true },
          lng: { value: store.lng, valid: true },
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
      const { id, code, name, picture, phone, address, lat, lng } = this.state.form;
      if (isFormValid([name, picture, phone, address, lat, lng])) {
        Helper.setLoading(true);
        this.setState({
          isSubmitting: true,
        });
        const form = {
          id: id.value,
          code: code.value,
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
              <div className="modal-header"><h5>Update Store</h5></div>
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