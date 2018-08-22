import React, { Component } from 'react';
import { capchaKey } from '../../enviroment';

class GgReCapcha extends Component {

  onLoad = () => {
    if (window.grecaptcha) {
      window.grecaptcha.render("recaptcha", {
        sitekey:capchaKey,
        size: "invisible",
        callback: this.onCaptcheCompleted,
        render:"explicit",
      });
    }
  };
  onCaptcheCompleted = e => {
    //do what ever you want
    this.props.onEmittedValue({
      name: 'uvresp',
      value: e,
      valid: true,
    })
  };

  componentDidMount() {
    this.onLoad();
  }

  render() {
    return (
      <div id='recaptcha'></div>
    )
  }
}

export default GgReCapcha;