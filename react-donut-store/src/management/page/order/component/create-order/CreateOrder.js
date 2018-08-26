import React, { Component } from 'react';
import $ from 'jquery';

class CreateOrder extends Component {

  componentDidMount() {
    $('#open-modal-create-order').click();
  }

  onCloseModal = () => {
    this.props.onEmittedCloseModal({
      name: 'showCreateModal',
      value: false
    });
  }

  onCreateOrder = () => {
    console.log("create");
    setTimeout(() => {
      $('#close-create-modal').click();
    }, 3000);
  }

  render() {
    return (
      <section>
        <button style={{ display: 'none' }} type="button" id="open-modal-create-order"
          data-backdrop={'static'} data-keyboard={false}
          data-toggle="modal" data-target="#modal-create-order">
        </button>
        <div id="modal-create-order" className="modal fade bd-example-modal-lg" tabIndex={-1} role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <div className="container-fluid">

                  <div className="row">
                    <div className="col-12">
                      <button className="btn btn-outline-dark" id="close-create-modal" onClick={this.onCloseModal} data-dismiss="modal" aria-label="Close">Quay laị</button>&nbsp;
                      <button className="btn btn-outline-primary" onClick={this.onCreateOrder}>Tạo</button>
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

export default CreateOrder;