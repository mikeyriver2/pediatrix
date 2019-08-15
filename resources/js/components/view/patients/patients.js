import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import NewPayments from '../../modals/new-payments'
import NewAppointment from '../../modals/new-appointment'
import SearchBar from '../../modules/searchbar';
import QuickSummary from '../../summaries/quick-summary';
import SummaryWithLabel from '../../summaries/summary-with-label';

export default class ViewPatients extends Component{
    constructor(){
        super();
        this.state = {
            patients: [],
        }
    }

    render(){
        return (
            <div>
                nothing
            </div>
        )
    }
}