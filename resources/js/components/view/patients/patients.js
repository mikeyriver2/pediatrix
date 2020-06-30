import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import NewPayments from '../../modals/new-payments';
import NewAppointment from '../../modals/new-appointment';
import SearchBar from '../../modules/searchbar';
import Summary from '../../summaries/summary';
import QuickSummary from '../../summaries/quick-summary';
import SummaryWithLabel from '../../summaries/summary-with-label';

export default class ViewPatients extends Component {
  constructor() {
    super();
    this.state = {
      patients: [],
    };
    this.setPatients = this.setPatients.bind(this);
  }

  componentDidMount() {
    axios.get('/api/patients').then((res) => {
      this.setPatients(res.data.patients);
    });
  }

  setPatients(patients) {
    if (patients) {
      this.setState({
        patients,
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
            filterBy: ['All', 'Inpatient', 'Outpatient'],
            searchUrl: '/api/patients/filter',
            setData: this.setPatients,
          }}
          summary={this.state.patients}
          parent="ViewPatients"
          header="Patients List"
        />

      </div>
    );
  }
}
