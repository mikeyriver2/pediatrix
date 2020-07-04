import React, { Component } from 'react';
import {
  withRouter,
} from 'react-router-dom';


const navBar = (props) => {
  const { location, history } = props;
  const { pathname } = location;
  let path = 'HOME';
  if (pathname && pathname !== '') {
    if (pathname.includes('patients')) {
      path = 'PATIENTS';
    } else if (pathname.includes('records')) {
      path = 'RECORDS';
    } else if (pathname.includes('payments')) {
      path = 'PAYMENTS';
    }
  }
  return (
    <div className="top-nav-desktop">
      <h5>{path}</h5>
    </div>
  );
};

export default withRouter(navBar);
