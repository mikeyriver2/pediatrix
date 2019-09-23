import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import NewPayments from '../../modals/new-payments'
import NewAppointment from '../../modals/new-appointment'
import SearchBar from '../../modules/searchbar';
import Summary from '../../summaries/summary';
import QuickSummary from '../../summaries/quick-summary';
import SummaryWithLabel from '../../summaries/summary-with-label';
import axios from 'axios';

export default class ViewPayments extends Component{
    constructor(){
        super();
        this.state = {
            payments: [],
        }
    }

    componentDidMount(){
        axios.get('/api/payments').then(res=>{
            this.setState({
                payments: res.data
            })
        })
    }

    render(){
        const summary = [
            {header: "Total Patients", value: 10},
            {header: "New Patients This Week", value: 2},
            {header: "Newest Patient", value: "Mikey Rivera"},
        ]
        return (
            <div className="view-patients">
                <QuickSummary 
                    summary = {summary}
                />
                {/*<Summary 
                    summary = {this.state.patients}
                    parent = "ViewPatients"
                    header = "Patients List"
                />*/}
                <SummaryWithLabel 
                    summary = {this.state.payments}
                    parent = "ViewPatients"
                    header = "Patients List"
                    filterBy = {["All", "InPatient", "OutPatient"]}
                />

            </div>
        )
    }
}