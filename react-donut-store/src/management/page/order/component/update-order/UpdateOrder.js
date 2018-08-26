import React, { Component } from 'react';
import $ from 'jquery';

class UpdateOrder extends Component {
  componentDidMount() {
    $('#open-modal-update-order').click();
  }

  onCloseModal = () => {
    this.props.onEmittedCloseModal({
      name: 'showUpdateModal',
      value: false
    });
  }

  onUpdateOrder = () => {
    setTimeout(() => {
      $('#close-update-modal').click();
    }, 3000);
  }

  render() {
    return (
      <section>
        <button style={{ display: 'none' }} type="button" id="open-modal-update-order"
          data-backdrop={'static'} data-keyboard={false}
          data-toggle="modal" data-target="#modal-update-order">
        </button>
        <div id="modal-update-order" className="modal fade bd-example-modal-lg" tabIndex={-1} role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <div className="container-fluid">

                  <div className="row">
                    <div className="col-12">
                      <div className="float-right">
                        <button type="button" id="close-update-modal" className="btn btn-outline-dark" onClick={this.onCloseModal} data-dismiss="modal" aria-label="Close">Quay laị</button>&nbsp;
                      <button type="button" className="btn btn-outline-primary" onClick={this.onUpdateOrder}>Cập nhật</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section >
    );
  }
}

export default UpdateOrder;