import React, { Component } from 'react';
import $ from 'jquery';
import CustomInput from '../../../share/common/custom-input/CustomInput';
import { isFormValid } from '../../../share/common/custom-validation';
import { changePassword } from '../../page/config/model/user/UserApiCaller';
import * as Helper from '../../../share/common/helper/Helper';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wasSubmitted: false,
      isSubmitting: false,
      oldPassword: { value: '', valid: false },
      newPassword: { value: '', valid: false },
      reNewPassword: { value: '', valid: false },
      showRequired: false,
      message: '',
    }
  }

  componentDidMount() {
    $('#open-modal-change-password').click();
  }

  onCloseModal = () => {
    this.props.onEmittedCloseModal({
      name: 'showChangePassword',
      value: false
    });
  }

  onChangePassword = () => {
    const { oldPassword, newPassword, reNewPassword } = this.state;
    if (isFormValid([oldPassword, newPassword, reNewPassword])) {
      if (newPassword.value === reNewPassword.value && newPassword.value !== oldPassword.value) {
        Helper.setLoading(true);
        this.setState({
          isSubmitting: true,
        });
        changePassword(oldPassword.value, newPassword.value).then(() => {
          Helper.setLoading(false);
          this.setState({
            showRequired: true,
            message: "Bạn đã thay đổi mật khẩu thành công",
            isSubmitting: false,
          });

        }).catch(error => {
          Helper.setLoading(false);
          this.setState({
            showRequired: true,
            message: error.response.data,
            isSubmitting: false,
          });
        })
      } else {
        this.setState({
          showRequired: true,
          message: 'Mật khẩu mới và mật khẩu cũ phải khác nhau, và mật khẩu mới phải trùng với Nhập lại mật khẩu',
        })
      }
    } else {
      this.setState({
        wasSubmitted: true,
      })
    }
  }

  onReceivedValue = (event) => {
    this.setState({
      [event.name]: { value: event.value, valid: event.valid },
    })
  }

  showRequired = () => {
    return this.state.showRequired ? (
      <div className="container">
        <div className="alert alert-warning">
          <button type="button" className="close" onClick={this.closeRequired}>×</button>
          <strong>{this.state.message}</strong>
        </div>
      </div>
    ) : null;
  }

  closeRequired = () => {
    this.setState({
      showRequired: true,
      message: '',
    })
  }
  render() {
    return (
      <section>
        <button style={{ display: 'none' }} type="button" id="open-modal-change-password"
          data-backdrop={'static'} data-keyboard={false}
          data-toggle="modal" data-target="#modal-change-password">
        </button>
        <div id="modal-change-password" className="modal fade" tabIndex={-1} role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <div className="container-fluid">
                  {this.showRequired()}
                  <div className="row">
                    <div className="col-8 offset-2">
                      <CustomInput type="password" name="oldPassword" placeholder="Mật khẩu cũ" value={this.state.oldPassword.value}
                        maxLength={20} onEmittedValue={this.onReceivedValue} wasSubmitted={this.state.wasSubmitted} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-8 offset-2">
                      <CustomInput type="password" name="newPassword" placeholder="Mật khẩu mới" value={this.state.newPassword.value}
                        maxLength={20} onEmittedValue={this.onReceivedValue} wasSubmitted={this.state.wasSubmitted} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-8 offset-2">
                      <CustomInput type="password" name="reNewPassword" placeholder="Nhập lại mật khẩu mới" value={this.state.reNewPassword.value}
                        maxLength={20} onEmittedValue={this.onReceivedValue} wasSubmitted={this.state.wasSubmitted} />
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-8">
                      <div className="float-right">
                        <button className="btn btn-outline-dark" disabled={this.state.isSubmitting} id="close-update-modal" onClick={this.onCloseModal} data-dismiss="modal" aria-label="Close">Quay lại</button>&nbsp;
                        <button className="btn btn-outline-primary" disabled={this.state.isSubmitting} onClick={this.onChangePassword}>Cập nhật</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section >
    )
  }
}

export default ChangePassword;