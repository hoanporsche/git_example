import React, { Component } from 'react';

class UpdateOrder extends Component {
  componentDidMount() {
    $('#open-modal-update-order').click();
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
                <div className="container ">

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