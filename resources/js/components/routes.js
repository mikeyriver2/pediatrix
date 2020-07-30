import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router, Link, Route, withRouter,
} from 'react-router-dom';
import axios from 'axios';
import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';
import * as actions from '../actions/index';
import Layout from './layout/layout';

import ViewPatients from './view/patients/patients';
import ViewPatient from './view/patients/patient';
import ViewRecords from './view/records/records';
import ViewRecord from './view/records/record';
import ViewPayments from './view/payments/payments';
import ViewPayment from './view/payments/payment';
import Dashboard from './dashboard/dashboard';

import CreatePatient from './create/patient';
import CreateRecord from './create/record';
import CreatePayment from './create/payment';

import DesktopSideBar from './layout/desktop-view/sidebar';
import DesktopNavBar from './layout/desktop-view/navigation-bar';

import Login from './auth/login';

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
    this.checkIfLogin = this.checkIfLogin.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  componentDidMount() {
    const { checkIfMobile } = this.props;
    this.checkIfLogin();
    checkIfMobile();
    setTimeout(() => {
      checkIfMobile();
    }, 1000)
    window.addEventListener('resize', () => {
      checkIfMobile();
    });

    axios.defaults.headers.common.Accept = 'application/json';
  }

  componentDidUpdate() {
    const { checkIfMobile } = this.props;
    checkIfMobile();
  }

  setUser(user) {
    this.setState({
      user,
    });
  }

  checkIfLogin() {
    axios.get('/api/user').then((res) => {
      this.setUser(res.data);
    });
  }

  render() {
    const { isMobile } = this.props;
    const { user } = this.state;
    /*
        The difference between <Router> and <Switch> is that Router will render all
        components detected in path, while Switch will only render the FIRST :)
    */
    return (
      user
        ? (
          <Router onUpdate={() => window.scrollTo(0, 0)}>
            <Route path="" component={Layout} />
            <div className="main-body">
              { !isMobile && <DesktopSideBar /> }
              <div className="main-body__contents">
                { !isMobile && <DesktopNavBar /> }
                <div className="main-body__contents--lower">
                  <Route exact path="/" component={Dashboard} />
                  <Route exact path="/patients" component={ViewPatients} />
                  <Route exact path="/patients/new" component={CreatePatient} />
                  <Route path="/patients/:patientId(\d+)" component={ViewPatient} />
                  <Route exact path="/payments" component={ViewPayments} />
                  <Route exact path="/payments/new" component={CreatePayment} />
                  <Route exact path="/payments/:paymentId(\d+)" component={ViewPayment} />
                  <Route exact path="/records" component={ViewRecords} />
                  <Route path="/records/new" component={CreateRecord} />
                  <Route exact path="/records/:recordId(\d+)" component={ViewRecord} />
                  <Route exact path="/home" component={Dashboard} />
                </div>
              </div>
            </div>
          </Router>
        )
        : (
          <Login
            setUser={this.setUser}
          />
        )
    );
  }
}

const mapStateToProps = (state) => ({
  isMobile: state.isMobile,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ ...actions }, dispatch);

// export default Routes;
export default connect(mapStateToProps, mapDispatchToProps)(Routes);
