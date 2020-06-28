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
import Sidebar from './sidebar';
import Dashboard from '../dashboard/dashboard';
import ViewPatients from '../view/patients/patients';
import ViewRecords from '../view/records/records';
import ViewPayments from '../view/payments/payments';

class Layout extends Component {
  constructor() {
    super();
    this.state = {
      appHeight: '',
      ass: 'ass',
      showSideBar: false,
    };
    this.header = React.createRef();
    this.switchSideBar = this.switchSideBar.bind(this);
  }

  componentDidMount() {
    this.setState({
      appHeight: document.getElementById('pediatrix').clientHeight,
    }, () => {
      // console.log(this.state.appHeight);
      // document.getElementById('sidebar-container').style.height = `${this.state.appHeight}px`;
    });
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
    element.classList.remove('sidebar-show');
    element.classList.add('sidebar-hidden');
    document.getElementById('pediatrix').removeAttribute('style');
  }

  render() {
    const { location, history } = this.props;
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
          <Row className="layout-nav">
            <img
              onClick={history.goBack}
              className="ignore-sidebar"
              alt="arrow"
              src="/images/arrow_2.png"
            />
            <h5 onClick={this.switchSideBar} className="layout-main-nav">{ path }</h5>
          </Row>
        </div>
        <Sidebar
          {...this.props}
          layoutRef={this.header}
          showSideBar={this.state.showSideBar}
          hideSideBar={this.hideSideBar}
        />
      </div>
    );
  }
}

export default withRouter(Layout);
