import React, { Component } from 'react';
import HeaderMain from '../../layout-main/header-main/HeaderMain';
import FooterMain from '../../layout-main/footer-main/FooterMain';

import { connect } from 'react-redux';

class Home extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let listItem = [];
    return(
      <div>
        <HeaderMain />
        Home
        <FooterMain />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listItem : state.itemReducer,
  }
}
export default connect(mapStateToProps, null)(Home);