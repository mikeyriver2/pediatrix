import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router, Link, Route, withRouter,
} from 'react-router-dom';
import axios from 'axios';
import Layout from './layout/layout';
import ViewPatients from './view/patients/patients';
import ViewPatient from './view/patients/patient';
import ViewRecords from './view/records/records';
import ViewRecord from './view/records/record';
import ViewPayments from './view/payments/payments';
import ViewPayment from './view/payments/payment';
import Dashboard from './dashboard/dashboard';

class Routes extends Component {
  constructor() {
    super();
    this.state = {

    };
  }

  componentDidMount() {

  }

  render() {
    /*
        The difference between <Router> and <Switch> is that Router will render all
        components detected in path, while Switch will only render the FIRST :)
    */
    return (
      <Router>
        <Route path="" component={Layout} />
        <div className="main-body">
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/patients" component={ViewPatients} />
          <Route exact path="/patients/:patientId" component={ViewPatient} />
          <Route exact path="/payments" component={ViewPayments} />
          <Route exact path="/payments/:paymentId" component={ViewPayment} />
          <Route exact path="/records" component={ViewRecords} />
          <Route exact path="/records/:recordId" component={ViewRecord} />
          <Route exact path="/home" component={Dashboard} />
        </div>
      </Router>
    );
  }
}

export default Routes;
