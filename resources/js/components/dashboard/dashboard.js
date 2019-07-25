import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Link, Route, withRouter} from 'react-router-dom';
import {
    Row,
    Col
} from 'react-bootstrap';

export default class Dashboard extends Component{
    constructor(){
        super();
        this.state = {

        }
    }

    render(){
        return (
            <div className="dashboard-container">
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
                <div className="summary-container">
                    <div className="summary-headers">
                        <h6 className="sh-top">
                            RECENT APPOINTMENTS
                        </h6>
                        <h4 className="sh-bottom">
                            THIS WEEK
                        </h4>
                    </div>
                    <div className="summary-items">
                        <div className="bottom-top-borders summary-item">
                            <h6 className="item-header">
                                JOHNNY DEPP
                            </h6>
                            <h6 className="item-desc">
                                GENERAL CONSULTATION
                            </h6>
                            <h7 className="item-created-at">
                            10AM-10:30AM
                            </h7>
                        </div>
                        <div className="bottom-top-borders summary-item">
                            <h6 className="item-header">
                                JOHNNY DEPP
                            </h6>
                            <h6 className="item-desc">
                                GENERAL CONSULTATION
                            </h6>
                            <h7 className="item-created-at">
                            10AM-10:30AM
                            </h7>
                        </div>
                        <div className="bottom-top-borders summary-item">
                            <h6 className="item-header">
                                JOHNNY DEPP
                            </h6>
                            <h6 className="item-desc">
                                GENERAL CONSULTATION
                            </h6>
                            <h7 className="item-created-at">
                            10AM-10:30AM
                            </h7>
                        </div>
                        <div className="bottom-top-borders summary-item">
                            <h6 className="item-header">
                                JOHNNY DEPP
                            </h6>
                            <h6 className="item-desc">
                                GENERAL CONSULTATION
                            </h6>
                            <h7 className="item-created-at">
                            10AM-10:30AM
                            </h7>
                        </div>

                        <a className="view-all">View All Appointments ></a>
                    </div>
                </div>
                <div className="summary-container">
                    <div className="summary-headers">
                        <h6 className="sh-top">
                            RECENT PAYMENTS
                        </h6>
                        <h4 className="sh-bottom">
                            THIS WEEK
                        </h4>
                    </div>
                    <div className="summary-items">
                        <Row className="bottom-top-borders item-row-container">
                            <Col xs={8} className="no-right-padding summary-item">
                                <h6 className="item-header">
                                    JOHNNY DEPP
                                </h6>
                                <h6 className="item-desc">
                                    GENERAL CONSULTATION
                                </h6>
                                <h7 className="item-created-at">
                                10AM-10:30AM
                                </h7>
                            </Col>
                            <Col xs={4} className="completed no-padding summary-item-label">
                                <h7 className="status">
                                    COMPLETED
                                </h7>
                            </Col>
                        </Row>
                        <Row className="bottom-top-borders item-row-container">
                            <Col xs={8} className="no-right-padding summary-item">
                                <h6 className="item-header">
                                    JOHNNY DEPP
                                </h6>
                                <h6 className="item-desc">
                                    GENERAL CONSULTATION
                                </h6>
                                <h7 className="item-created-at">
                                10AM-10:30AM
                                </h7>
                            </Col>
                            <Col xs={4} className="incomplete no-padding summary-item-label">
                                <h7 className="status">
                                    INCOMPLETE
                                </h7>
                            </Col>
                        </Row>
                        <Row className="bottom-top-borders item-row-container">
                            <Col xs={8} className="no-right-padding summary-item">
                                <h6 className="item-header">
                                    JOHNNY DEPP
                                </h6>
                                <h6 className="item-desc">
                                    GENERAL CONSULTATION
                                </h6>
                                <h7 className="item-created-at">
                                10AM-10:30AM
                                </h7>
                            </Col>
                            <Col xs={4} className="pending no-padding summary-item-label">
                                <h7 className="status">
                                    PENDING
                                </h7>
                            </Col>
                        </Row>
                        <a className="view-all">View All Appointments ></a>
                    </div>
                </div>
            </div>
        )
    }
}