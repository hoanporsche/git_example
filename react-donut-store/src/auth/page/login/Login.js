import React, { Component } from 'react';
import './Login.css';
import { NavLink } from 'react-router-dom';
import { ROUTING_URL, MODEL_ROUTING } from '../../../share/constant/routing.constant';
import CustomInput from '../../../share/common/custom-input/CustomInput';
import { login, getInfo } from '../../util';
import { LOCAL_STORAGE } from '../../../share/constant/local-storage.constant';
import { resetPassword } from '../../../management/page/config/model/user/UserApiCaller';

class UnAuthorizedComponent extends Component {
  componentWillMount() {
    if (JSON.parse(localStorage.getItem(LOCAL_STORAGE.CURRENT_USER)) !== null) {
      window.location.href = MODEL_ROUTING.MANAGEMENT;
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailReset: '',
      isSubmitting: false,
    }
  }

  onReceivedValue = (event) => {
    if (!this.state.isSubmitting) {
      this.setState({
        [event.name]: event.value,
      })
    }
  }

  onHandleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      isSubmitting: true
    })
    login(this.state.email, this.state.password).then((response) => {
      if (response.status === 200) {
        localStorage.setItem(LOCAL_STORAGE.TOKEN, JSON.stringify(response.data.access_token));
        getInfo().then(({ data }) => {
          localStorage.setItem(LOCAL_STORAGE.CURRENT_USER, JSON.stringify(data));
          this.setState({
            isSubmitting: true
          })
          this.props.history.push(MODEL_ROUTING.MANAGEMENT);
        }).catch(error => {
          console.log(error.response);
          this.setState({
            isSubmitting: true
          })
        })
      }
    })
  }

  onChangeInput = (event) => {
    if (!this.state.isSubmitting) {
      this.setState({
        emailReset: event.target.value.toString().trim(),
      })
    }
  }

  resetPassword = () => {
    this.setState({
      isSubmitting: true
    })
    resetPassword(this.state.email).then(({ data }) => {
      this.setState({
        isSubmitting: false,
      });
    }).catch(error => {
      this.setState({
        isSubmitting: false,
      });
    })
  }

  render() {
    return (
      <div id="login" className="container-fluid">
        <div className="row">
          <div className="col-12 col-xl-6 form-login text-center">
            <div className="row">
              <div className="col-12">
                <div className="image-header">

                </div>
                <h4>Bánh rán Hoàn</h4>
                <div className="noti-header">
                  {/* <div className="" role="alert"> */}
                  <p>FOR DEMO PURPOSE:
                    <br /> Username:
                    <span style={{ color: 'black' }}>admin@gmail.com, nuitruc@gmail.com, giangvo@gmail.com</span>
                    <br /> Password:
                    <span style={{ color: 'black' }}>2352</span>
                  </p>
                  {/* </div> */}
                </div>
                <form onSubmit={this.onHandleSubmit} className="section-input">
                  <CustomInput type='text' required={true}
                    placeholder="email" name="email" value={this.state.email}
                    maxLength={20} onEmittedValue={this.onReceivedValue} />
                  <CustomInput type='password' required={true}
                    placeholder="Số điện thoại" name="password" value={this.state.password}
                    maxLength={12} onEmittedValue={this.onReceivedValue} />
                  <div className="row">
                    <div className="col-12">
                      <div className="float-right">
                        {/* <NavLink to={ROUTING_URL.FORGOT_PASSWORD}><h5>{MENU_NAME.FORGOT_PASSWORD} ?</h5></NavLink> */}
                        <a data-toggle="modal" data-target="#resetPasswordModal">
                          <h5>Quên mật khẩu</h5>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <button type="submit" className="btn btn-primary btn-login" disabled={this.state.isSubmitting}>Đăng nhập</button>&nbsp;
                      <NavLink className="btn btn-light btn-login" to={ROUTING_URL.HOME}><span>Quay lại</span></NavLink>
                    </div>
                  </div>
                </form>
                <div className="row">
                  <div className="col-12">
                    <h5>Developed by <a href="https://www.facebook.com/vu.hoan.39">Vũ Hoàn</a> @2018</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-xl-6 login-image"></div>

        </div>
        <div className="modal fade" id="resetPasswordModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <p style={{ fontSize: '1.25rem', cursor: 'pointer' }} className="modal-title" id="exampleModalLongTitle">Hãy nhập email của bạn</p>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <input type="email" maxLength={255} name="email" value={this.state.emailReset} onChange={this.onChangeInput} className="form-control" />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" disabled={this.state.isSubmitting} data-dismiss="modal">Quay lại</button>
                <button type="button" className="btn btn-primary" disabled={this.state.isSubmitting} onClick={this.resetPassword}>Tìm lại mật khẩu</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default UnAuthorizedComponent;