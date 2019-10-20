import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Link, Route, withRouter} from 'react-router-dom';
import Layout from './layout/layout';
import axios from 'axios'
import ViewPatients from './view/patients/patients';
import ViewRecords from './view/records/records';
import ViewPayments from './view/payments/payments';
import Dashboard from './dashboard/dashboard';

class Routes extends Component{
    constructor(){
        super()
        this.state = {

        }
    }
    componentDidMount(){
        
    }

    render(){
        //The difference between <Router> and <Switch> is that Router will render all components detected in path, while Switch will only render the FIRST :)
        return (
            <Router>
                <Route path="" component={Layout} /> 
                <Route exact path={`/`} component={Dashboard}/>
                <Route exact path={`/patients`} component={ViewPatients}/>
                <Route exact path={`/payments`} component={ViewPayments}/>
                <Route exact path={`/records`} component={ViewRecords}/>
                <Route exact path={`/home`} component={Dashboard}/>
            </Router>
            );
    }
}

export default Routes;