/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router, Link, Route, withRouter,
} from 'react-router-dom';
import {
  Row,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/index';

import Sidebar from './sidebar';
import Dashboard from '../dashboard/dashboard';
import ViewPatients from '../view/patients/patients';
import ViewRecords from '../view/records/records';
import ViewPayments from '../view/payments/payments';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appHeight: '',
      showSideBar: false,
    };
    this.header = React.createRef();
    this.switchSideBar = this.switchSideBar.bind(this);
  }

  componentDidMount() {
    this.setState({
      appHeight: document.getElementById('pediatrix').clientHeight,
    });
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    if (
      location.pathname !== prevProps.location.pathname
    ) {
      window.scrollTo(0, 0);
    }
  }

  switchSideBar() {
    const element = document.getElementById('sidebar-container');
    const classes = element.className;
    if (classes.includes('sidebar-hidden')) {
      this.setState({
        showSideBar: true,
      }, () => {
        element.classList.remove('sidebar-hidden');
        element.classList.add('sidebar-show');
        document.getElementById('pediatrix').style.overflow = 'hidden';
      });
    } else {
      this.setState({
        showSideBar: false,
      }, () => {
        element.classList.remove('sidebar-show');
        element.classList.add('sidebar-hidden');
        document.getElementById('pediatrix').removeAttribute('style'); // re-enable scroll
      });
    }
  }

  hideSideBar() {
    const element = document.getElementById('sidebar-container');
    if (element) {
      element.classList.remove('sidebar-show');
      element.classList.add('sidebar-hidden');
      document.getElementById('pediatrix').removeAttribute('style');
    }
  }

  render() {
    const { location, history, isMobile } = this.props;
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
      <div ref={this.header} className="main-layout">
        <div role="button" tabIndex={0} className="layout-header">
          <Row className="layout-main-logo">
            <img alt="pediatrix" src="/images/pediatrix1.png" />
          </Row>
          { isMobile
            && (
            <Row className="layout-nav">
              <img
                onClick={history.goBack}
                className="ignore-sidebar"
                alt="arrow"
                src="/images/arrow_2.png"
              />
              <h5 onClick={this.switchSideBar} className="layout-main-nav">{ path }</h5>
            </Row>
            )}
        </div>
        <Sidebar
          {...this.props}
          layoutRef={this.header}
          showSideBar={this.state.showSideBar}
          hideSideBar={this.hideSideBar}
          isMobile={isMobile}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isMobile: state.isMobile,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ ...actions }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));
