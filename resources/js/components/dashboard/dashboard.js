import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Link, Route, withRouter} from 'react-router-dom';
import {
    Row,
    Col
} from 'react-bootstrap';
import Summary from '../summaries/summary';
import QuickSummary from '../summaries/quick-summary';
import SummaryWithLabel from '../summaries/summary-with-label';
import NewPayments from '../modals/new-payments'
import NewAppointment from '../modals/new-appointment'

export default class Dashboard extends Component{
    constructor(){
        super();
        this.state = {
            appointments: [],
            quickSummaries: {},
            payments: []
        }
    }

    render(){
        return (
            <div className="dashboard-container">
                <QuickSummary />
                <Summary />
                <SummaryWithLabel />
                <NewAppointment />
            </div>
        )
    }
}