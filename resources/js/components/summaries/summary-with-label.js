import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Link, Route, withRouter} from 'react-router-dom';
import {
    Row,
    Col
} from 'react-bootstrap';

export default class SummaryWithLabel extends Component{
    constructor(){
        super();
        this.state = {

        }
    }

    render(){
        return (
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
                            <h6 className="item-created-at">
                            10AM-10:30AM
                            </h6>
                        </Col>
                        <Col xs={4} className="completed summary-item-label">
                            <h6 className="status">
                                COMPLETED
                            </h6>
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
                            <h6 className="item-created-at">
                            10AM-10:30AM
                            </h6>
                        </Col>
                        <Col xs={4} className="incomplete summary-item-label">
                            <h6 className="status">
                                INCOMPLETE
                            </h6>
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
                            <h6 className="item-created-at">
                            10AM-10:30AM
                            </h6>
                        </Col>
                        <Col xs={4} className="pending summary-item-label">
                            <h6 className="status">
                                PENDING
                            </h6>
                        </Col>
                    </Row>
                    <a className="view-all">View All Appointments ></a>
                </div>
            </div>
        )
    }
}