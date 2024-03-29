import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import NewPayments from '../../modals/new-payments';
import NewAppointment from '../../modals/new-appointment';
import SearchBar from '../../modules/searchbar';
import Summary from '../../summaries/summary';
import QuickSummary from '../../summaries/quick-summary';
import SummaryWithLabel from '../../summaries/summary-with-label';

export default class ViewRecords extends Component {
  constructor() {
    super();
    this.state = {
      records: [],
    };
    this.setRecords = this.setRecords.bind(this);
  }

  componentDidMount() {
    axios.get('/api/records').then((res) => {
      this.setState({
        records: res.data,
      });
    });
  }

  setRecords(records) {
    if (records) {
      this.setState({
        records,
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
            searchUrl: '/api/patients/filter',
            setData: this.setRecords,
          }}
          summary={this.state.records}
          parent="ViewRecords"
          header="Records List"
          filterBy={['All', 'InPatient', 'OutPatient']}
        />

      </div>
    );
  }
}
