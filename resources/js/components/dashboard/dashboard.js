import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router, Link, Route, withRouter,
} from 'react-router-dom';
import {
  Row,
  Col,
} from 'react-bootstrap';
import axios from 'axios';
import Summary from '../summaries/summary';
import QuickSummary from '../summaries/quick-summary';
import SummaryWithLabel from '../summaries/summary-with-label';
import NewPayments from '../modals/new-payments';
import NewAppointment from '../modals/new-appointment';
import SearchBar from '../modules/searchbar';

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      quickSummaries: {},
      payments: [],
      patients: [],
      recrods: [],
    };
  }

  componentDidMount() {
    axios.get('/api/').then((res) => {
      const { data } = res;
      const {
        quickSummary, patients, payments, records,
      } = data;
      const quickies = [
        {
          header: 'Patients this Week',
          value: quickSummary.patWeek,
        },
        {
          header: 'Records this Week',
          value: quickSummary.recWeek,
        },
        {
          header: 'Payments this Week',
          value: quickSummary.payWeek,
        },
      ];

      this.setState({
        quickSummaries: quickies,
        patients,
        payments,
        records,
      });
    });
  }

  render() {
    const {
      quickSummaries,
      payments,
      records,
      patients,
    } = this.state;
    return (
      <div className="dashboard-container">
        <QuickSummary
          summary={quickSummaries}
        />
        {/* <Summary /> */}
        <SummaryWithLabel
          summary={patients}
          parent="ViewPatients"
          header="Most Recent Patients"
          filterBy={['All', 'InPatient', 'OutPatient']}
        />
        <SummaryWithLabel
          summary={payments}
          parent="ViewPayments"
          header="Most Recent Payments"
          filterBy={['All', 'InPatient', 'OutPatient']}
        />
        <SummaryWithLabel
          summary={records}
          parent="ViewRecords"
          header="Most Recent Records"
          filterBy={['All', 'InPatient', 'OutPatient']}
        />
      </div>
    );
  }
}
