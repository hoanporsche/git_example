import React, { Component } from 'react';
import { CONFIG } from '../../../../../share/constant/configuration.constant';
import * as Helper from '../../../../../share/common/helper/Helper';
import { findList } from './MaterialDailyReportApiCaller';

class MaterialDailyReport extends Component {

  constructor(props) {
    super(props);
    this.state = {
      listReport: [],
      params: {
        name: '',
        materialId: '',
        startDate: '',
        endDate: '',
        page: 0,
        size: CONFIG.PAGE_SIZE,
        sort: 'id,desc'
      },
      isSubmitting: false,
    }
  }

  componentDidMount() {
    Helper.setLoading(true);
    this.setState({
      isSubmitting: true,
    });
    findList(this.state.params).then(({ data }) => {
      Helper.setLoading(false);
      this.setState({
        isSubmitting: false,
      });
      console.log(data);
    }).catch(({ response }) => {
      Helper.setLoading(false);
      this.setState({
        isSubmitting: false,
      }, () => alert(response.data));
    })
  }

  render() {
    return (
      <div className="container page-min-height">
        MaterialDailyReport
      </div>
    )
  }
}

export default MaterialDailyReport;