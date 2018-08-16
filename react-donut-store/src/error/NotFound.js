import React, { Component } from 'react';

class NotFound extends Component {

  render() {
    const title = (this.props.title === undefined) ? "Page Không tồn tại" : this.props.title;
    return (
      <div className="container">
        <div className="alert alert-warning">
          <button type="button" className="close" data-dismiss="alert" aria-hidden="true">&times;</button>
          <strong>{title}</strong>
        </div>
      </div>
    );
  }
}

export default NotFound;