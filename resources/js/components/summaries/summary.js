import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Link, Route, withRouter} from 'react-router-dom';
import {
    Row,
    Col
} from 'react-bootstrap';

export default class Summary extends Component{
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
                        <h6 className="item-created-at">
                        10AM-10:30AM
                        </h6>
                    </div>
                    <div className="bottom-top-borders summary-item">
                        <h6 className="item-header">
                            JOHNNY DEPP
                        </h6>
                        <h6 className="item-desc">
                            GENERAL CONSULTATION
                        </h6>
                        <h6 className="item-created-at">
                        10AM-10:30AM
                        </h6>
                    </div>
                    <div className="bottom-top-borders summary-item">
                        <h6 className="item-header">
                            JOHNNY DEPP
                        </h6>
                        <h6 className="item-desc">
                            GENERAL CONSULTATION
                        </h6>
                        <h6 className="item-created-at">
                        10AM-10:30AM
                        </h6>
                    </div>
                    <div className="bottom-top-borders summary-item">
                    <h6 className="item-header">
                            JOHNNY DEPP
                        </h6>
                        <h6 className="item-desc">
                            GENERAL CONSULTATION
                        </h6>
                        <h6 className="item-created-at">
                        10AM-10:30AM
                        </h6>
                    </div>
                    <a className="view-all">View All Appointments ></a>
                </div>
            </div>
        )
    }
}