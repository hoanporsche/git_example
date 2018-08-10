import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetAllItem } from '../../../redux/action/item.constant';

class Detail extends Component {

  constructor(props) {
    super(props);
    const {location, match}=this.props;
    console.log(location);
    console.log(match);
  }

  componentDidMount() {
    let { listItem } = this.props;
    if (listItem.length === 0) {
      this.props.fetchAllItem();
    }
  }

  render() {
    return(
      <div>123</div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listItem: state.itemReducer,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllItem: () => {
      dispatch(fetAllItem());
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Detail);