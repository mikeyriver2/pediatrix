import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Link, Route, withRouter} from 'react-router-dom';
import {
    Row,
    Col
} from 'react-bootstrap';

export default class QuickSummary extends Component{
    constructor(){
        super();
        this.state = {

        }
    }

    render(){
        return (
            <div className="quick-summary-container">
                <Row style={{paddingTop:"20px"}} className="quick-summary-item"> 
                    <Col xs={8} className="qsi-left"> 
                        <h6>
                            APPOINTMENTS TODAY
                        </h6>
                    </Col>
                    <Col xs={4} className="qsi-right">
                        <h6>
                            <b>10</b>
                        </h6>
                    </Col>
                </Row>
                <Row className="quick-summary-item"> 
                    <Col xs={6} className="qsi-left">
                        <h6>
                            INCOME THIS MONTH
                        </h6>
                    </Col>
                    <Col xs={6} className="qsi-right">
                        <h6>
                            <b>15,000.00 PhP</b>
                        </h6>
                    </Col>
                </Row>
                <Row className="quick-summary-item"> 
                    <Col xs={8} className="qsi-left">
                        <h6>
                            PATIENTS THIS MONTH
                        </h6>
                    </Col>
                    <Col xs={4} className="qsi-right">
                        <h6>
                            <b>10</b>
                        </h6>
                    </Col>
                </Row>
                <Row className="quick-summary-item"> 
                    <Col xs={8} className="qsi-left">
                        <h6>
                            RECORDS THIS MONTH
                        </h6>
                    </Col>
                    <Col xs={4} className="qsi-right">
                        <h6>
                            <b>10</b>
                        </h6>
                    </Col>
                </Row>
            </div>
        )
    }
}