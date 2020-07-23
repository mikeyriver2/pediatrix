import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import NewPayments from '../../modals/new-payments';
import NewAppointment from '../../modals/new-appointment';
import SearchBar from '../../modules/searchbar';
import Summary from '../../summaries/summary';
import QuickSummary from '../../summaries/quick-summary';
import SummaryWithLabel from '../../summaries/summary-with-label';

export default class ViewPayments extends Component {
  constructor() {
    super();
    this.state = {
      payments: [],
    };
    this.setRecords = this.setRecords.bind(this);
  }

  componentDidMount() {
    axios.get('/api/payments').then((res) => {
      this.setState({
        payments: res.data,
      });
    });
  }

  setRecords(payments) {
    if (payments) {
      this.setState({
        payments,
      });
    }
  }

  render() {
    const summary = [
      { header: 'Total Patients', value: 10 },
      { header: 'New Patients This Week', value: 2 },
      { header: 'Newest Patient', value: 'Mikey Rivera' },
    ];
    return (
      <div className="view-patients">
        <QuickSummary
          summary={summary}
        />
        {/* <Summary
                    summary = {this.state.patients}
                    parent = "ViewPatients"
                    header = "Patients List"
                /> */}
        <SummaryWithLabel
          search={{
            filterBy: ['All', 'Pending', 'Paid', 'Delayed'],
            searchUrl: '/api/payments/filter',
            setData: this.setRecords,
          }}
          summary={this.state.payments}
          parent="ViewPayments"
          header="Payment List"
        />

      </div>
    );
  }
}
