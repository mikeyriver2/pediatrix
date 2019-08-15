import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import NewPayments from '../../modals/new-payments'
import NewAppointment from '../../modals/new-appointment'
import SearchBar from '../../modules/searchbar';
import Summary from '../../summaries/summary';
import QuickSummary from '../../summaries/quick-summary';

export default class ViewPatients extends Component{
    constructor(){
        super();
        this.state = {
            patients: [],
        }
    }

    render(){
        return (
            <div className="view-patients">
                <QuickSummary />
                <Summary />
            </div>
        )
    }
}