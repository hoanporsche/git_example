import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Breadcrumb extends Component {

  showBreadcrums = () => {
    return this.props.listBreadcrumb.length > 0 ? (
      this.props.listBreadcrumb.map((breadcrumb, index) => {
        return <Route key={index} path={breadcrumb.to} exact={breadcrumb.activeOnlyWhenExact} children={({ match }) => {
          let active = match ? 'active' : '';
          return (
            <li className={`breadcrumb-item ${active}`}>
              {match ? breadcrumb.label : (
                <Link to={breadcrumb.to}>{breadcrumb.label}</Link>
              )}
            </li>
          )
        }} />
      })
    ) : null;
  }
  render() {
    return (
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb custom-breadcrumb">
          {this.showBreadcrums()}
        </ol>
      </nav>
    );
  }
}

Breadcrumb.propTypes = {
  listBreadcrumb: PropTypes.arrayOf(PropTypes.shape({
    to: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    activeOnlyWhenExact: PropTypes.bool.isRequired
  }))
}
export default Breadcrumb;