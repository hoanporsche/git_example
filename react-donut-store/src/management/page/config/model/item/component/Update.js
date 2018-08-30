import React, { Component } from 'react';
import $ from 'jquery';
import CustomInput from '../../../../../../share/common/custom-input/CustomInput';
import CustomSelect from '../../../../../../share/common/custom-select/CustomSelect';
import CustomTextarea from '../../../../../../share/common/custom-textarea/CustomTextarea';
import * as Helper from '../../../../../../share/common/helper/Helper';
import { save } from '../ItemApiCaller';
import { isFormValid } from '../../../../../../share/common/custom-validation';
import PropTypes from 'prop-types';

class Update extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isSubmitting: false,
      updatedData: '',
      form: {
        id: { value: '', valid: false },
        code: { value: '', valid: false },
        name: { value: '', valid: false },
        picture: { value: '', valid: false },
        categoryId: { value: '', valid: false },
        singleValue: { value: '', valid: false },
        description: { value: '', valid: false },
      },
      wasSubmitted: false,
    }
  }
  componentDidMount() {
    $('#open-modal-update').click();
    if (this.props.item) {
      const { item } = this.props;
      this.setState({
        form: {
          id: { value: item.id, valid: true },
          code: { value: item.code, valid: true },
          name: { value: item.name, valid: true },
          picture: { value: item.picture, valid: true },
          categoryId: { value: item.categoryId.id, valid: true },
          singleValue: { value: item.singleValue, valid: true },
          description: { value: item.description, valid: true },
        }
      })
    }
  }

  onCloseModal = () => {
    this.props.onEmittedCloseModalUpdate({
      name: 'showModalUpdate',
      value: false,
    })
  }
  onCloseModalAndUpdate = () => {
    this.props.onEmittedCloseModalUpdate({
      name: 'showModalUpdate',
      value: false,
      update: this.state.updatedData,
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

  onSubmit = () => {
    if (!this.state.isSubmitting) {
      const { id, code, name, picture, categoryId, singleValue, description } = this.state.form;
      if (isFormValid([name, picture, categoryId, singleValue, description])) {
        Helper.setLoading(true);
        this.setState({
          isSubmitting: true,
        });
        const form = {
          id: id.value,
          code: code.value,
          name: name.value,
          picture: picture.value,
          categoryId: +categoryId.value,
          singleValue: +singleValue.value,
          description: description.value,
        }
        save(form).then(({ data }) => {
          Helper.setLoading(false);
          this.setState({
            isSubmitting: false,
            updatedData: data,
          }, () => {
            $('#close-modal-update-and-update').click();
          });
        }).catch(({ response }) => {
          Helper.setLoading(false);
          this.setState({
            isSubmitting: false,
          });
          console.log(response);
        })
      } else {
        this.setState({
          wasSubmitted: true,
        })
      }
    }
  }
  render() {
    return (
      <section>
        <button style={{ display: 'none' }} type="button" id="open-modal-update"
          data-backdrop={'static'} data-keyboard={false}
          data-toggle="modal" data-target="#modal-update">
        </button>
        <div id="modal-update" className="modal fade" tabIndex={-1} role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header"><h5>Update Item</h5></div>
              <div className="modal-body">
                <CustomInput type="text" name="name" placeholder="Item's name" value={this.state.form.name.value}
                  maxLength={20} onEmittedValue={this.onReceivedValue} wasSubmitted={this.state.wasSubmitted} />
                <CustomInput type="text" name="singleValue" placeholder="Item's single value" value={this.state.form.singleValue.value}
                  maxLength={20} onEmittedValue={this.onReceivedValue} wasSubmitted={this.state.wasSubmitted} />
                <CustomSelect placeholder="Category" name="categoryId" value={this.state.form.categoryId.value}
                  data={this.props.listCategory} onEmittedValue={this.onReceivedValue} wasSubmitted={this.state.wasSubmitted} />
                <CustomTextarea type="text" name="picture" placeholder="Item's picture" value={this.state.form.picture.value}
                  maxLength={1000} onEmittedValue={this.onReceivedValue} wasSubmitted={this.state.wasSubmitted} />
                <CustomTextarea type="text" name="description" placeholder="Item's description" required={false} value={this.state.form.description.value}
                  maxLength={255} onEmittedValue={this.onReceivedValue} wasSubmitted={this.state.wasSubmitted} />
              </div>
              <div className="modal-footer">
                <button style={{ display: 'none' }} id="close-modal-update-and-update" onClick={this.onCloseModalAndUpdate} data-dismiss="modal" aria-label="Close"></button>&nbsp;
                <button className="btn btn-outline-dark" disabled={this.state.isSubmitting} id="close-modal-update" onClick={this.onCloseModal} data-dismiss="modal" aria-label="Close">Back</button>&nbsp;
                <button className="btn btn-outline-primary" disabled={this.state.isSubmitting} onClick={this.onSubmit}>Update</button>
              </div>
            </div>
          </div>
        </div>
      </section >
    )
  }
}
Update.propTypes = {
  item: PropTypes.any.isRequired,
  listCategory: PropTypes.array,
}
Update.defaultProps = {
  listCategory: [],
}
export default Update;