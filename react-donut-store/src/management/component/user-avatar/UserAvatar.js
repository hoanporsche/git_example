import React, { Component } from 'react';
import './UserAvatar.css';
import { LOCAL_STORAGE } from '../../../share/constant/local-storage.constant';
import { NavLink, withRouter } from 'react-router-dom';
import { ROUTING_URL, MODEL_ROUTING } from '../../../share/constant/routing.constant';
import ChangePassword from '../change-password/ChangePassword';

const currentUser = JSON.parse(localStorage.getItem(LOCAL_STORAGE.CURRENT_USER));
const defaultPic = "https://www.viawater.nl/files/default-user.png";

class UserAvatar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showSomeFunctionInfo: false,
      showChangePassword: false,
    }
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside, true);
  }

  setShowSomeFunctionInfo = () => {
    this.setState({
      showSomeFunctionInfo: !this.state.showSomeFunctionInfo,
    })
  }

  onLogout = () => {
    localStorage.removeItem(LOCAL_STORAGE.CURRENT_USER);
    localStorage.removeItem(LOCAL_STORAGE.TOKEN);
    window.location.href = ROUTING_URL.LOGIN;
  }
  onShowChangePassword = () => {
    this.setState({
      showChangePassword: true,
    })
  }
  showSomeFunction = () => {
    return this.state.showSomeFunctionInfo ? (
      <div className="some-function text-center">
        <h5>{currentUser.email}</h5>
        <hr />
        <h5><NavLink className="single-function" to={MODEL_ROUTING.MANAGEMENT + ROUTING_URL.USER_PROFILE}>Thông tin cá nhân</NavLink></h5>
        <h5 className="single-function"><a className="single-function" onClick={this.onShowChangePassword}>Thay đổi mật khẩu</a></h5>
        <hr />
        <button className="btn btn-outline-info" style={{ bottom: '1em' }} onClick={this.onLogout}>Đăng xuất</button>
      </div>
    ) : null;
  }
  handleClickOutside = (event) => {
    const className = event.target.className;
		const approvedClassName = ["avatar-user","some-function text-center","btn btn-outline-info","single-function"];
		if (approvedClassName.indexOf(className) === -1) {
			this.setState({showSomeFunctionInfo: false})
		}
  }

  onReceivedCloseModal = () => {
    this.setState({
      showChangePassword: false,
    })
  }
  render() {
    const userPic = currentUser.picture ? currentUser.picture : defaultPic;
    return (
      <div id="user-avatar" >
        <div className="avatar-user" style={{ backgroundImage: `url(${userPic})` }} onClick={this.setShowSomeFunctionInfo}></div>
        {this.showSomeFunction()}
        {this.state.showChangePassword ? (<ChangePassword email={currentUser.email} onEmittedCloseModal={this.onReceivedCloseModal}/>) : null}
      </div>
    )
  }
}

export default withRouter(UserAvatar);