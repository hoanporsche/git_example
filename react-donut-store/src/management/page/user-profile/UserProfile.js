import React, { Component } from 'react';
import './UserProfile.css';
import { LOCAL_STORAGE } from '../../../share/constant/local-storage.constant';
import CustomInput from '../../../share/common/custom-input/CustomInput';
import CustomTextarea from '../../../share/common/custom-textarea/CustomTextarea';
import BaseService from '../../../share/util/BaseService';
import { baseUrl } from '../../../enviroment';
import { API_URL, MODEL_URL } from '../../../share/constant/api.constant';
import { isFormValid} from '../../../share/common/custom-validation';
import * as Helper from '../../../share/common/helper/Helper';
import { MODEL_ROUTING, ROUTING_URL } from '../../../share/constant/routing.constant';

let currentUser = JSON.parse(localStorage.getItem(LOCAL_STORAGE.CURRENT_USER));
const saveUrl = baseUrl + API_URL.API + MODEL_URL.USER + API_URL.SAVE;
class UserProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isSubmitting: false,
      form: {
        email: { value: '', valid: false },
        picture: { value: '', valid: false },
      },
      wasSubmitted: false,
    }
  }

  componentDidMount() {
    this.setState({
      form: {
        email: { value: currentUser.email, valid: true },
        picture: { value: currentUser.picture, valid: true }
      }
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

  onBack = () => {
    if (!this.state.isSubmitting)
      window.location.href = MODEL_ROUTING.MANAGEMENT;
  }
  onSubmit = () => {
    if (!this.state.isSubmitting) {
      const { email, picture } = this.state.form;
      if (isFormValid([email, picture])) {
        Helper.setLoading(true);
        this.setState({
          isSubmitting: true,
        });
        const form = {
          email: email.value,
          picture: picture.value,
        }
        BaseService.get(saveUrl, form).then(({ data }) => {
          Helper.setLoading(false);
          localStorage.setItem(LOCAL_STORAGE.CURRENT_USER, JSON.stringify(data));
          this.setState({
            isSubmitting: false,
          });
          window.location.href = MODEL_ROUTING.MANAGEMENT + ROUTING_URL.USER_PROFILE;
        }).catch(({ response }) => {
          Helper.setLoading(false);
          this.setState({
            isSubmitting: false,
          }, () => alert(response ? response.data : 'Something went wrongs!'));
        })
      } else {
        this.setState({
          wasSubmitted: true,
        })
      }
    }
  }

  render() {
    const avatar = currentUser.picture === '' ? 'http://www.chugh.com/wp-content/uploads/2018/03/default_user.jpg' : currentUser.picture;
    return (
      <div id="user-profile" className="container padding-top1 page-min-height">
        <div className="row">
          <div className="col-12">
            <div className="user-avatar" style={{ backgroundImage: `url(${avatar})` }}></div>
          </div>
        </div>
        <div className="row padding-top1">
          <div className="col-8 offset-2 col-md-6 offset-md-3">
            <CustomInput type="text" name="email" placeholder="User's email" value={this.state.form.email.value}
              maxLength={100} onEmittedValue={this.onReceivedValue} wasSubmitted={this.state.wasSubmitted} />
            <CustomTextarea type="text" name="picture" placeholder="User's picture" value={this.state.form.picture.value}
              maxLength={255} onEmittedValue={this.onReceivedValue} wasSubmitted={this.state.wasSubmitted} required={false} />
          </div>
        </div>
        <div className="row">
          <div className="col-8 offset-2 col-md-6 offset-md-3">
            <div className="float-right">
              <button className="btn btn-outline-dark" disabled={this.state.isSubmitting} onClick={this.onBack}>Back</button>&nbsp;
              <button className="btn btn-outline-primary" disabled={this.state.isSubmitting} onClick={this.onSubmit}>Update</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default UserProfile;