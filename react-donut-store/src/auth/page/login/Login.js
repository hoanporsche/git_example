import React, { Component } from 'react';
import './Login.css';
import { NavLink } from 'react-router-dom';
import { ROUTING_URL, MENU_NAME, MODEL_ROUTING } from '../../../share/constant/routing.constant';
import CustomInput from '../../../share/common/custom-input/CustomInput';
import { login, getInfo } from '../../util';
import { LOCAL_STORAGE } from '../../../share/constant/local-storage.constant';

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
    }
  }

  onReceivedValue = (event) => {
    this.setState({
      [event.name]: event.value,
    })
  }

  onHandleSubmit = (event) => {
    event.preventDefault();
    login(this.state.email, this.state.password).then((response) => {
      if (response.status === 200) {
        localStorage.setItem(LOCAL_STORAGE.TOKEN, JSON.stringify(response.data.access_token));
        getInfo().then(({ data }) => {
          localStorage.setItem(LOCAL_STORAGE.CURRENT_USER, JSON.stringify(data));
          this.props.history.push(MODEL_ROUTING.MANAGEMENT);
        }).catch(error => {
          console.log(error);
        })
      }
    })
  }

  render() {
    return (
      <div id="login" className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-6 form-login text-center">
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
                        <NavLink to={ROUTING_URL.FORGOT_PASSWORD}><h5>{MENU_NAME.FORGOT_PASSWORD} ?</h5></NavLink>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <button type="submit" className="btn btn-primary btn-login">Đăng nhập</button>&nbsp;
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

          <div className="col-12 col-md-6 login-image">

          </div>

        </div>
      </div>
    )
  }
}

export default UnAuthorizedComponent;